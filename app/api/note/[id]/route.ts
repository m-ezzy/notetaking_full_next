import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/note/:id
export async function GET(request : NextRequest, { params }: { params: { id: number } }) {
  const note: any = await prisma.note.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
  })
  .then((newNote) => {
    return NextResponse.json({ success: true, note: newNote }, { status: 200 });
  })
  .catch((error: any) => {
    return NextResponse.json({ error: error }, { status: 500 });
  });
  return note;
}

// UPDATE /api/note/:id
export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const body = await req.json();

  const result = await prisma.note.update({
    data: {
      title: body.title,
      content: body.content
    },
    where: {
      id: Number(params.id),
    },
  })
  .then((updatedNote) => {
    return NextResponse.json({ success: true, note: updatedNote}, { status: 200 });
  })
  .catch((error) => {
    return NextResponse.json({ error: error }, { status: 500 });
  });
  return result;
}

// DELETE /api/note/:id
export async function DELETE(request : NextRequest, { params }: { params: { id: number } }) {
  const result = await prisma.note.delete({
    where: {
      id: Number(params.id),
    },
  })
  .then((deletedNote) => {
    return NextResponse.json({ success: true }, { status: 200 });
  })
  .catch((error) => {
    return NextResponse.json({ error: error }, { status: 500 });
  });
  return result;
}
