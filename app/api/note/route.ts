import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// export async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("handler", req.method);
// }
export async function GET(req: NextRequest, res: NextResponse) {
  const notes = await prisma.note.findMany();
  // res.json(notes);
  // NextResponse.json(notes);
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

// import type { NextApiRequest, NextApiResponse } from "next";
// import { type Note } from "@/logic/note";
// import { list, geById, create, update, remove } from "@/logic/note";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Note[] | string>,
// ) {
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
