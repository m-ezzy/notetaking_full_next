import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("handler", req.method);
}
export async function GET(req: NextRequest, res: NextResponse) {
  const notes = await prisma.note.findMany();
  // res.json(notes);
  return NextResponse.json(notes);
}
export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json();
  const { title, content } = body;
  
  const newNote = await prisma.note.create({
    data: {
      title: title,
      content: content,
    },
  })
  .then((note) => {
    res.status(201).json(note);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
  return NextResponse.json({ success: true, note: newNote});
}
