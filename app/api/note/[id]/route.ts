import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const noteId = req.query.id;

  // switch (req.method) {
  //   case 'DELETE':
  //     return DELETE(noteId, res)
  //   default:
  //     throw new Error(
  //       `The HTTP ${req.method} method is not supported at this route.`,
  //     );
  // }
}

// GET /api/note/:id
export async function GET(request : NextRequest,{ params }: { params: { id: number } }) {
  const id =  params.id
  const post = await prisma.note.findUnique({
    where: { id: id },
  });
  return NextResponse.json(post);
}

// UPDATE /api/note/:id
export async function PUT(req: NextRequest, res: NextApiResponse, { params }: { params: { id: number } }) {
  const body = await req.json();
  const { id, title, content } = body;

  const updatedNote = await prisma.note.update({
    where: { id: id },
    data: { title: title, content: content },
  })
  .then((note) => {
    res.status(200).json(note);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
  return NextResponse.json({ success: true, note: updatedNote});
}

// DELETE /api/note/:id
export async function DELETE(request : NextRequest, response: NextResponse, { params }: { params: { id: number } }) {
  const id =  params.id;
 const deletedNote = await prisma.note.delete({
    where: { id: id },
  });
  // return res.json(note)
  return NextResponse.json({ message: "Delete success" });
}
