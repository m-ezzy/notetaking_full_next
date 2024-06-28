"use client";
import { useState, useRef, RefObject, ReactNode } from "react";
import { useNotes } from "../contexts/NotesContext";
import { Note } from "@prisma/client";
import prisma from "../lib/prisma";
import { deleteNote, updateNote } from "../lib/note-actions";

export default function NoteItem({ note }: { note: Note }) {
  const titleRef: any = useRef(null);
  const contentRef: any = useRef(null);
  const { setNotes } = useNotes();

  async function handleClickEdit() {
    const updatedNote = {
      ...note,
      title: titleRef.current.value,
      content: contentRef.current.value
    };
    let data = await updateNote(updatedNote);
    setNotes(prev => [...prev].map((n: Note) => n.id === note.id ? updatedNote : n));
  }
  async function handleClickDelete() {
    const data: any = await deleteNote(note.id);
    setNotes((prev: Note[]) => [...prev].filter((n: Note) => n.id !== note.id));
  }
	return (
    <div className='min-w-96 min-h-max border-2 border-primary rounded-lg p-2 bg-secondary'>
      <input type="text" className='w-full block border-b-2 bg-transparent text-xl' defaultValue={note.title} ref={titleRef} />
      <textarea className='w-full min-h-max bg-transparent resize-none' defaultValue={note.content} ref={contentRef} />
      <div className='flex justify-end text-sm'>{ new Date(note.updated_at).toUTCString() }</div>

      <div className='mt-2 flex gap-1'>
        <button className='rounded p-2 bg-primary' onClick={handleClickEdit}>Edit</button>
        <button className='rounded p-2 bg-primary' onClick={handleClickDelete}>Delete</button>
      </div>
    </div>
  );
}
