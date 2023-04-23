import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { produce } from 'immer';
import $ from 'jquery';
import NewNoteBar from './new_note_bar';

import Note from './note';

function App() {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    $.getJSON('assets/notes.json').then(
      (data) => {
        setNotes(data);
      },
    );
  }, []);

  return (
    <div className="app-container">
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);

function Notes(props) {
  const { notes, setNotes } = props;

  const addNote = ({ title, text }) => {
    const newId = Math.max(...Object.keys(notes).map((id) => parseInt(id, 10))) + 1;
    const fullNote = {
      // ...newNote, // title, text
      title,
      text,
      x: 50,
      y: 50,
      z: 1,
      width: 200,
      height: 200,
    };
    setNotes(
      produce((draft) => {
        draft[newId] = fullNote;
      }),
    );
  };

  const deleteNote = (id) => {
    console.log(`deleted note ${id}`);
    const deleter = produce((draft) => {
      delete draft[id];
    });
    setNotes(deleter);
  };

  const updateNote = (id, updates) => {
    const updater = produce((draft) => {
      draft[id] = { ...draft[id], ...updates };
    });
    setNotes(updater);
  };

  return (
    <div className="notes-container">
      <NewNoteBar addNote={addNote} />
      <div className="notes">
        {Object.entries(notes).map(([id, note]) => (
          <Note
            key={id}
            id={id}
            note={note}
            updateNote={updateNote}
            deleteNote={() => deleteNote(id)}
            style={{ x: note.x, y: note.y, zIndex: note.z }}
          />
        ))}
      </div>
    </div>
  );
}
