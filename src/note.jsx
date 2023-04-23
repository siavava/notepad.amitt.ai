import React, { useState } from 'react';
// import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';
import ReactMarkdown from 'react-markdown';

export default function Note(props) {
  // const {
  //   title, text, x, y, z, handleUpdate, handleDelete,
  // } = note;
  // console.log(note);
  const {
    id, note, updateNote, deleteNote,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  // const [noteTitle, setNoteTitle] = useState(title);
  // const [noteText, setNoteText] = useState(text);
  // const [notePosition, setNotePosition] = useState({ x, y, z });

  // const sendUpdate = () => {
  //   handleUpdate(note.id, { title: noteTitle, text: noteText, ...notePosition });
  // };

  const updateTitle = (newTitle) => {
    updateNote(id, { title: newTitle });
  };

  const updateText = (newText) => {
    console.log(`updating text from ${note.text} to ${newText}`);
    updateNote(id, { text: newText });
  };

  const updatePosition = (newPosition) => {
    updateNote(id, { x: newPosition.x, y: newPosition.y });
  };

  const handleStartDrag = () => {
    updateNote(id, { z: note.z + 1 });
  };

  const handleDrag = (e, data) => {
    // updatePosition(id, { x: data.x, y: data.y });
    updateNote(id, { x: data.x, y: data.y });
  };

  const handleResize = (e, direction, ref, delta, position) => {
    updateNote(id, {
      x: position.x,
      y: position.y,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  // const handleStopDrag = () => {
  //   updatePosition(id, { x: data.x, y: data.y })
  // };

  const handleDelete = () => {
    updateNote(id, { deleted: true });
  };

  const finishEditing = () => {
    setIsEditing(false);
  };

  return (
    <Rnd
      size={{ width: note.width, height: note.height }}
      position={{ x: note.x, y: note.y }}
      minWidth="300px"
      minHeight="300px"
      // enableUserSelectHack={false}
      // onDragStop={handleDrag}
      onDrag={handleDrag}
      onResize={handleResize}
      className="note"
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={note.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="note-title"
          />
          <textarea
            value={note.text}
            onChange={(e) => updateText(e.target.value)}
            className="note-text"
          />
          <div className="note-actions">
            <button className="note-action" type="button" onClick={finishEditing}>
              Update
            </button>
            <button className="note-action" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="note-title">{note.title}</h2>
          <ReactMarkdown className="note-text">{note.text || ''}</ReactMarkdown>
          <div className="note-actions">
            <button className="note-action" type="button" onClick={() => setIsEditing(true)}>
              <img src="assets/edit.svg" className="icon" alt="edit" />
            </button>
            <button className="note-action" type="button" onClick={deleteNote}>
              <img src="assets/delete.svg" className="icon" alt="edit" />
            </button>
          </div>
        </>
      )}
    </Rnd>
  );
}
