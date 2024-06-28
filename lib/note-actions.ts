"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function getNotes() {
  return prisma.note.findMany();
}
export async function createNote({ title, content }: { title: string, content: string }) {
  let note = await prisma.note.create({ data: { title, content } });
  return { note };
}
export async function updateNote({ id, title, content }: { id: number, title: string, content: string }) {
  let note = await prisma.note.update({ where: { id }, data: { title, content } });
  return { note };
}
export async function deleteNote(id: number) {
  await prisma.note.delete({ where: { id } });
  return { message: "Note deleted successfully" };
}

// export async function createNote(prevState: any, formData: FormData) {
//   console.log("formData", formData);
//   try {
//     const result = await prisma.note.create({
//       data: {
//         title: formData.get("title") as string,
//         content: formData.get("content") as string,
//       },
//     });
//     // revalidatePath("/");
//     return { note: result };
//   } catch (err) {
//     console.error(err);
//     return { error: "Failed to create note" };
//   }
// }
// export async function updateNote(prevState: any, formData: FormData, id: number) {
//   try {
//     const result = await prisma.note.update({
//       where: { id: id },
//       data: {
//         title: formData.get("title") as string,
//         content: formData.get("content") as string,
//       },
//     });
//     revalidatePath("/");
//     return { note: result };
//   } catch (err) {
//     console.error(err);
//     return { error: "Failed to update note" };
//   }
// }
