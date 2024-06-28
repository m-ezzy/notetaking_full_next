import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const noteData: any = [
  {
    title: 'Alice',
    content: 'alice@prisma.io',
    created_at: new Date('2021-08-01'),
    updated_at: new Date('2021-08-01'),
  },
  {
    title: 'Bob',
    content: 'bob@prisma.io',
    created_at: new Date('2021-08-01'),
    updated_at: new Date('2021-08-01'),
  },
  {
    title: 'Eve',
    content: 'eve@prisma.io',
    created_at: new Date('2021-08-01'),
    updated_at: new Date('2021-08-01'),
  },
];

async function main() {
  console.log(`Seeding started`);
  for (const n of noteData) {
    const note = await prisma.note.create({
      data: n,
    });
    console.log(`Created note with id: ${note.id}`);
  }
  console.log(`Seeding finished`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
