import NoteModal from '../components/NoteModal';
import NoteList from '../components/NoteList';
import { NotesContextProvider } from '../contexts/NotesContext';

export default function Notes() {
  return (
    <>
      <NotesContextProvider>
        <NoteModal />
        <NoteList />
      </NotesContextProvider>
    </>
  );
}
