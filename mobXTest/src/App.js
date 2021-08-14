import { useState } from "react";
import "./App.css";
import { useNoteStore } from "./NotesContext";
import { useObserver } from "mobx-react";

function App() {
  const [text, setText] = useState("");

  const notesStore = useNoteStore();

  return useObserver(() => (
    <>
      <ul>
        {notesStore.notes.map((note) => {
          return (
            <li onClick={() => notesStore.removeNote(note.id)} key={note.id}>
              {note.text}
            </li>
          );
        })}
      </ul>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={() => notesStore.addNote(text)}> Add note</button>
    </>
  ));
}

export default App;
