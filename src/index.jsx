import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
// import { produce } from 'immer';
// import $ from 'jquery';
import NewNoteBar from './new_note_bar';
import * as datastore from './services/datastore';

import Note from './note';

function App() {
  const [notes, setNotes] = useState({});
  const [highestZIndex, setHighestZIndex] = useState(0);

  // on initial render, subscribe to changes from firebase
  useEffect(() => {
    datastore.onNotesValueChange((newNotes) => {
      setNotes(newNotes);
    });
  }, []);

  useEffect(() => {
    const highestZ = Math.max(...Object.values(notes).map((note) => note.z));
    setHighestZIndex(highestZ);
    console.log(`highestZIndex is now ${highestZIndex}`);
  }, [notes]);

  // useEffect(() => {
  //   $.getJSON('assets/notes.json').then(
  //     (data) => {
  //       setNotes(data);
  //     },
  //   );
  // }, []);

  return (
    <div className="app-container">
      <Notes notes={notes} highestZIndex={highestZIndex} setHighestZIndex={setHighestZIndex} setNotes={setNotes} />
    </div>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);

function Notes(props) {
  const { notes /* , setNotes */ } = props;

  const addNote = ({ title, text }) => {
    // const newId = Math.max(...Object.keys(notes).map((id) => parseInt(id, 10))) + 1;
    const fullNote = {
      title,
      text,
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      z: props.highestZIndex + 1,
    };

    // setNotes(
    //   produce((draft) => {
    //     draft[newId] = fullNote;
    //   }),
    // );

    // send to firebase!
    datastore.addNote(fullNote);
  };

  const deleteNote = (id) => {
    // const deleter = produce((draft) => {
    //   delete draft[id];
    // });
    // setNotes(deleter);

    // send update to firebase
    datastore.deleteNote(id);
  };

  const updateNote = (id, updates) => {
    // const updater = produce((draft) => {
    //   draft[id] = { ...draft[id], ...updates };
    // });
    // setNotes(updater);

    // send update to firebase
    datastore.updateNote(id, updates);
  };

  // const initZIndex = (keys) => {
  //   let allKeys = [];
  //   Object.keys(notes).forEach((key) => {
  //     allKeys.push(`#${key}`);
  //   });
  //   allKeys = allKeys.join(',');
  //   $(document).ready(() => {
  //     $(allKeys)
  //       .$(allKeys).draggable({ stack: 'div' });
  //   });
  // };

  return (
    <div className="notes-container">
      <NewNoteBar addNote={addNote} />
      <div className="notes">
        { notes && Object.entries(notes).map(([id, note]) => (
          <Note
            key={id}
            id={id}
            note={note}
            updateNote={updateNote}
            deleteNote={() => deleteNote(id)}
            style={{ x: note.x, y: note.y, zIndex: note.z }}
            highestZIndex={props.highestZIndex}
            setHighestZIndex={props.setHighestZIndex}
          />
        ))}
      </div>
    </div>
  );
}
