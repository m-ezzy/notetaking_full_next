
import NoteItem from './NoteItem';
import { useNotes } from '../contexts/NotesContext';
import { Note } from '@prisma/client';
import prisma from '../lib/prisma';
import { getNotes } from '../lib/note-actions';

// export default async NoteList({notesData:any}) => {
//   const { notes, setNotes }: any = useNotes();

//   // useEffect(() => {
//   //   (async () => {
//   //     // const notesData: any = await prisma.note.findMany({ orderBy: { updated_at: 'desc' } });
//   //     const notesData: any = await getNotes();
//   //     console.log(notesData);
//   //     setNotes(notesData);
//   //   })();
//   // }, []);
// }


export default async function NoteList() {
  // const notes = await getNotes();
  const notes = await prisma.note.findMany();
  return (
    <div className='p-4 flex flex-wrap gap-4'>
      {notes.length == 0 ? 
        <div>Loading...</div> : notes.map(note => <div key={note.id}><NoteItem note={note} /></div>)
      }
    </div>
  );
}


// export async function notes() {
//   const notesData: any = await getNotes();
//   return await NoteList({notesData});
// }