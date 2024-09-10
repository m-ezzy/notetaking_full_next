FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /appdirectory

# Copy dependencies
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /appdirectory
COPY --from=deps /appdirectory/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /appdirectory

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejsgroup
RUN adduser --system --uid 1001 nextjsuser

COPY --from=builder /appdirectory/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjsuser:nodejsgroup .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjsuser:nodejsgroup /appdirectory/.next/standalone ./
COPY --from=builder --chown=nextjsuser:nodejsgroup /appdirectory/.next/static ./.next/static

USER nextjsuser

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
