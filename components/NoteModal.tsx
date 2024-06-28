"use client"

import { useRef } from 'react';
import { useFormState } from "react-dom";
import { useNotes } from '../contexts/NotesContext';
import { Note } from '@prisma/client';
import prisma from '../lib/prisma';
// import makeRequest from '../lib/makeRequest';
import { createNote } from '../lib/note-actions';

export default function NoteModal() {
	const { setNotes } = useNotes();
	const titleRef: any = useRef();
	const contentRef: any = useRef();
	
	// const initialState = { error: {}, message: {}, data: {}, loading: false };
	// const [state, dispatch] = useFormState(createNote, initialState);
	// if (state.error) {
	// 	console.error(state.error);
	// } else if (state.data) {
	// 	setNotes((prev: Note[]) => [...prev, state.data.note]);
	// }

	async function handleClick(e) {
		e.preventDefault();

		const title = titleRef.current.value;
		const content = contentRef.current.value;
		try {
	    // let data: any = await makeRequest("/api/note/create", { title, content });
			// let data: any = await prisma.note.create({ data: { title, content } });
			let data: any = await createNote({ title, content });
			setNotes((prev: Note[]) => [...prev, data.note]);
		} catch (error) {
			console.error(error);
		}
		titleRef.current.value = '';
		contentRef.current.innerText = '';
	}
	return (
		<div className='w-3/5 mx-auto mb-4 border-2 rounded-md p-2'>
			<form>
				<input name="title" className='w-full block border-b-2 pb-1 bg-transparent' type='text' placeholder='type title here' autoFocus ref={titleRef} />
				<textarea name="content" className='w-full min-h-10 bg-transparent resize-none' ref={contentRef} placeholder='type content here'></textarea>
				{/* <div className="w-full min-h-10 bg-transparent" role="text" contentEditable></div> */}
				<button className='rounded p-2 bg-primary text-xl text-bold' type="submit" onClick={handleClick}>Create</button>
			</form>
		</div>
	);
}
