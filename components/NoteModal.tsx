"use client";
import { Ref, RefObject, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createNote } from '@/actions/note';

const initialState = {
	// message: "",
	// pending: false,
	success: false,
	error: false,
	// data: null,
};

function SubmitButton() {
  const { action, data, method, pending }: any = useFormStatus();
	return (
    <button type="submit" disabled={pending}>
			Create
    </button>
  );
}
export default function NoteModal() { //NoteAddForm
	const ref: Ref<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const [state, formAction]: any = useFormState(createNote, initialState);

	if(state.success) {
		ref.current.reset();
	}
	return (
		<div className='w-full mx-auto border rounded p-2 lg:w-3/5'>
			<form action={formAction} ref={ref}>
				{/* <label htmlFor="title">Title</label> */}
				<input type='text' name="title" className='w-full block bg-transparent border-b p-1' placeholder='Type title here' autoFocus /> {/* defaultValue={state.data.title} */}
				{/* <label htmlFor="content">Content</label> */}
				<textarea name="content" className='w-full min-h-10 bg-transparent resize-none p-1' placeholder='Type content here'></textarea> {/* defaultValue={state.data.content} */}
				{/* <div className="w-full min-h-10 bg-transparent" role="text" contentEditable></div> */}

				<SubmitButton />

				{state.success && <p className="text-green-400 mt-2">{state.success}</p>}
  	    {state.error && <p className="text-red-400 mt-2">{state.error}</p>}
			</form>
		</div>
	);
}
