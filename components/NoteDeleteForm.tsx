"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteNote } from "@/actions/note";

const initialState = {
  success: false,
  error: false,
};

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>Delete</button>
  );
}
export function NoteDeleteForm({ id }: { id: number }) {
  const [state, dispatch] = useFormState(deleteNote, null);

  return (
    <form action={dispatch}>
      <input type="number" name="id" value={id} readOnly hidden />
      <DeleteButton />
      {state?.error ? <span className="text-red-400 ml-2">{state.error}</span> : null}
    </form>
  );
}
