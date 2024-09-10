"use client";
import { useState, useRef, RefObject, ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Note } from "@prisma/client";
import { updateNote, deleteNote } from "@/actions/note";

export default function NoteItem({ note }: { note: Note }) {
  const ref: RefObject<HTMLFormElement> = useRef(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateState, updateDispatch] = useFormState(updateNote, { success: false, error: "", data: null });
  const [deleteState, deleteDispatch] = useFormState(deleteNote, { success: false, error: "" });

  if(updateState.success) {
    updateState.success = false;
    // updateState.error = false;
    setEditMode(prev => false);
  }
  // else if(updateState.error) {
  //   updateState.success = false;
  //   updateState.error = false;
  // }
  // async function handleClickUpdate() {
  //   setEditMode(prev => false);
  // }
  async function handleClickEdit() {
    setEditMode(prev => true);
  }
  async function handleClickCancel() {
    ref.current.reset();
    setEditMode(prev => false);
  }
	return (
    <div className="bg-neutral-800 min-h-max border rounded p-2">
      <form action={updateDispatch} ref={ref}>
        <input type="number" name="id" value={note.id} required={true} hidden={true} readOnly />

        <input type="text" name="title" className='bg-transparent w-full block border-b p-1 text-xl' defaultValue={note.title} disabled={!editMode} />
        <textarea name="content" className='bg-transparent w-full min-h-max p-1 resize-none' defaultValue={note.content} disabled={!editMode} />

        <div className='flex justify-end gap-1 text-sm'>
          <span>{new Date(note.updated_at).toDateString()}</span>
          <span className="text-gray-300">{new Date(note.updated_at).toLocaleTimeString()}</span>
        </div>

        {editMode && 
          <div className='mt-2 flex justify-end gap-2'>
            <button type="submit">Update</button> {/* onClick={handleClickUpdate} */}
            <button onClick={handleClickCancel}>Cancel</button>
            {/* {editMode && <button className='bg-zinc-600 border rounded p-2' disabled={updateState.pending} onClick={handleClickReset}>Reset</button> } */}
          </div>
        }
      </form>

      {!editMode && 
        <div className="mt-2 flex justify-end gap-2">
          <button onClick={handleClickEdit}>Edit</button> {/* disabled={updateState.pending} */}
          <form action={deleteDispatch}>
            <input type="number" name="id" value={note.id} hidden readOnly />
            <button type="submit">Delete</button>
          </form>
        </div>
      }

      {/* {updateState.success && <div className="text-green-400">{updateState.success}</div>} */}
      {updateState?.error && <div className="text-red-400 mt-2">{updateState.error}</div>}
      {deleteState?.error && <div className="text-red-600 mt-2">{deleteState.error}</div>}
    </div>
  );
}
