import React, { useState, useEffect } from 'react';
// import { produce } from 'immer';
import NewNoteBar from './new-note-bar';
import Note from './note';

import * as datastore from '../services/datastore';

export default function Notes(props) {
  const [notes, setNotes] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(0);

  // on value change, subscribe to firebase notes
  // and update local state any time the notes change.
  useEffect(() => {
    datastore.onNotesValueChange((newNotes) => {
      setNotes(newNotes);
    });
  }, []);

  // change highest z-index when notes are updated.
  useEffect(() => {
    const highestZ = Math.max(...Object.values(notes).map((note) => note.z));
    setHighestZIndex(highestZ);
  }, [notes]);

  const addNote = ({ title, text }) => {
    const fullNote = {
      title,
      text,
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      z: highestZIndex + 1,
    };

    // ? deprecated: adding to local state, send to firebase instead
    // const newId = Math.max(...Object.keys(notes).map((id) => parseInt(id, 10))) + 1;
    // setNotes(
    //   produce((draft) => {
    //     draft[newId] = fullNote;
    //   }),
    // );

    // ------------------------------

    // send to firebase!
    datastore.addNote(fullNote);
  };

  const deleteNote = (id) => {
    // ? deprecated: deleting local state, send to firebase instead
    // const deleter = produce((draft) => {
    //   delete draft[id];
    // });
    // setNotes(deleter);

    // ------------------------------
    datastore.deleteNote(id);
  };

  const updateNote = (id, updates) => {
    // ? deprecated: updating local state, send to firebase instead
    // const updater = produce((draft) => {
    //   draft[id] = { ...draft[id], ...updates };
    // });
    // setNotes(updater);

    // ------------------------------
    datastore.updateNote(id, updates);
  };

  function any(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i]) {
        return true;
      }
    }
    return false;
  }

  const search = (title, text) => {
    if (title || text) {
      const results = Object.entries(notes).filter(([id, note]) => {
        const matches = [];
        matches.push(title ? note.title.toLowerCase().includes(title.toLowerCase()) : false);
        matches.push(title ? note.text.toLowerCase().includes(title.toLowerCase()) : false);
        matches.push(text ? note.title.toLowerCase().includes(text.toLowerCase()) : false);
        matches.push(text ? note.text.toLowerCase().includes(text.toLowerCase()) : false);
        return any(matches);
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="notes-container">
      <NewNoteBar addNote={addNote} search={search} searchResults={searchResults} />
      <div className="notes">
        { notes && Object.entries(notes).map(([id, note]) => (
          <Note
            key={id}
            id={id}
            note={note}
            updateNote={updateNote}
            deleteNote={() => deleteNote(id)}
            style={{ x: note.x, y: note.y, zIndex: note.z }}
            highestZIndex={highestZIndex}
            setHighestZIndex={setHighestZIndex}
            highlighted={searchResults.map((result) => result[0]).includes(id)}
          />
        ))}
      </div>
    </div>
  );
}
