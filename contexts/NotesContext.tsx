"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import prisma from "../lib/prisma";

const NotesContext = createContext(null);

function useNotes() {
  return useContext(NotesContext);
}

function NotesContextProvider(props: React.PropsWithChildren) {
  const [notes, setNotes] = useState([]);
  return <NotesContext.Provider value={{ notes, setNotes }}>{props.children}</NotesContext.Provider>;
}

export { NotesContextProvider, useNotes };
