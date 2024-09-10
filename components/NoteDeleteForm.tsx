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
    <button type="submit" aria-disabled={pending}>Delete</button>
  );
}
export function NoteDeleteForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(deleteNote, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      {state?.error ? <span>{state.error}</span> : null}
    </form>
  );
}
