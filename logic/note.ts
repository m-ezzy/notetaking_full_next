import prisma from "@/lib/prisma";

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export async function list() { //getAll getNotes
  return await prisma.note.findMany()
  .then((notes) => {
    return { success: notes };
  })
  .catch((err: any) => {
    return { error: "Failed to list | " + err.message };
  });
}
export async function geById(id: number) {
  return await prisma.note.findUnique({
    where: { id: id }
  })
  .then((note) => {
    return { success: note };
  })
  .catch((err: any) => {
    return { error: "Failed to get | " + err.message };
  });
}
export async function create({ title, content }: { title: string, content: string }) {
  const result: any = await prisma.note.create({
    data: { title, content }
  })
  .then((note) => {
    return { success: "Created successfully" };
  })
  .catch((err: any) => {
    return { error: "Failed to create | " + err.message };
  });
  return result;
}
export async function update({ id, title, content }: { id: number, title: string, content: string }) {
  const result: any = await prisma.note.update({
    where: { id: id },
    data: { title, content }
  })
  .then((note) => {
    return { success: "Updated successfully" };
  })
  .catch((err: any) => {
    return { error: "Failed to update | " + err.message };
  });
  return result;
}
export async function remove(id: number) {
  const result: any = await prisma.note.delete({
    where: { id: id }
  })
  .then((note) => {
    return { success: "Deleted successfully" };
  })
  .catch((err: any) => {
    return { error: "Failed to delete | " + err.message };
  });
  return result;
}
