// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { type Note, list, geById, create, update, remove } from "@/logic/note";

// GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, 405 Method Not Allowed

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Note[] | string>,
// ) {
//   console.log("handler", req.method);
//
//   switch (req.method) {
//     case "GET":
//       return res.status(200).json(await list());
//     case "POST":
//       return res.status(201).json(await create(req.body));
//     case "PUT":
//       const updated = await update(req.body);
//       return res.status(updated.length > 0 ? 200 : 404).json(updated);
//     case "DELETE":
//       const removed = await remove(req.body);
//       return res.status(removed.length > 0 ? 204 : 404).end();
//     default:
//       return res.status(405).send("Method Not Allowed");
//   }
// }

// get
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  let response: NextResponse;

  if(id) {
    response = await prisma.note.findUniqueOrThrow({
      where: { id: Number(id) },
    })
    .then((note) => {
      return NextResponse.json({ success: true, note: note }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json({ error: error }, { status: 500 });
    });
  } else {
    response = await prisma.note.findMany()
    .then((notes) => {
      return NextResponse.json({ success: true, notes: notes }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json({ error: error }, { status: 500 });
    });
  }

  return response;
}
// create
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newNote = await prisma.note.create({ data: body })
  .then((note) => {
    // res.status(201).json(note);
    return new Response(JSON.stringify({ success: true, note: note }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  })
  .catch((error) => {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  });
  
  return newNote;
}
// update
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, title, content } = body;

  const result = await prisma.note.update({
    data: { title: title, content: content },
    where: { id: id },
  })
  .then((note) => {
    return NextResponse.json({ success: true, note: note }, { status: 200 });
  })
  .catch((error) => {
    return NextResponse.json({ error: error }, { status: 500 });
  });
  return result;
}
// delete
export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const result = await prisma.note.delete({
    where: { id: body.id },
  })
  .then((note) => {
    return NextResponse.json({ success: true, note: note }, { status: 200 });
  })
  .catch((error) => {
    return NextResponse.json({ error: error }, { status: 500 });
  });
  return result;
}
