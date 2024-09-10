"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { list, geById, create, update, remove } from "@/logic/note";

export async function getNotes(prevState: any, formData: FormData) {
  const notes: any = await prisma.note.findMany();
  return notes;
}
export async function getNoteById(prevState: any, formData: FormData) {
  const note: any = await prisma.note.findUnique({
    where: { id: parseInt(formData.get("id") as string) }
  });
  return note;
}
export async function createNote(prevState: any, formData: FormData) {
  // try {
  //   const result: any = await prisma.note.create({
  //     data: {
  //       title: formData.get("title") as string,
  //       content: formData.get("content") as string,
  //     },
  //   });
  //   revalidatePath("/");
  //   return { pending: false, success: "Creation was successfull", error: "", data: result };
  // } catch (err: any) {
  //   console.error(err.message);
  //   return { pending: false, error: "Failed to create note" };
  // }
  const  result: any = await create({ title: formData.get("title") as string, content: formData.get("content") as string });
  if(result.success) {
    revalidatePath("/");
  }
  return result;
}
export async function updateNote(prevState: any, formData: FormData) {
  // try {
  //   const note: any = await prisma.note.update({
  //     data: {
  //       title: formData.get("title") as string,
  //       content: formData.get("content") as string,
  //     },
  //     where: {
  //       id: parseInt(formData.get("id") as string)
  //     },
  //   });
  //   revalidatePath("/");
  //   return { success: "Updated successfully", data: note };
  // } catch (error) {
  //   return { error: `Failed to update | ${error.message}` };
  // }
  let result: any = await prisma.note.update({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
    where: {
      id: parseInt(formData.get("id") as string),
    },
  })
  .then((note: any) => {
    revalidatePath("/");
    return { success: "Updation successfull" }
  })
  .catch((err: any) => {
    return { error: `Updation failed | ${err.message}` }
  });
  return result;
}
export async function deleteNote(prevState: any, formData: FormData) {
  let result: any = await prisma.note.delete({
    where: {
      id: parseInt(formData.get("id") as string)
    }
  })
  .then(() => {
    revalidatePath("/");
    return { success: "Note deleted successfully" }
  })
  .catch((err: any) => {
    return { error: `Failed to delete note | ${err.message}` }
  });
  return result;
}
