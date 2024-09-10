import { Note } from '@prisma/client';
import prisma from '@/lib/prisma';
// import { list } from '@/logic/note';
import NoteItem from './NoteItem';

export default async function NoteList() {
  // const notes: any = await list();
  const notes: any = await prisma.note.findMany({
    orderBy: { updated_at: 'desc' }
  })
  .catch((error) => {
    return { error: error.message };
  });

  if(notes.error) {
    return <div>{notes.error.message}</div>;
  } else if(notes.length === 0) {
    return <div>No notes found</div>;
  }

  const noteItems: any = notes.map((note: Note) => <NoteItem key={note.id} note={note} />);

  return (
    <div className='p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {noteItems}
    </div>
  );
}
