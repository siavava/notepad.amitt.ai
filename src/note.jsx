import React, { useState } from 'react';
import Draggable from 'react-draggable';

function Note(id, note, updateNote) {
  // const {
  //   title, text, x, y, zIndex, handleUpdate, handleDelete,
  // } = note;
  const [isEditing, setIsEditing] = useState(false);
  // const [noteTitle, setNoteTitle] = useState(title);
  // const [noteText, setNoteText] = useState(text);
  // const [notePosition, setNotePosition] = useState({ x, y, zIndex });

  // const sendUpdate = () => {
  //   handleUpdate(note.id, { title: noteTitle, text: noteText, ...notePosition });
  // };

  const updateTitle = (e) => {
    updateNote(id, { title: e.target.value });
  };

  const updateText = (e) => {
    updateNote(id, { text: e.target.value });
  };

  const updatePosition = (e, data) => {
    updateNote(id, { x: data.x, y: data.y });
  };

  const handleStartDrag = (e, data) => {
    setNotePosition({ ...notePosition, zIndex: notePosition.zIndex + 1 });
    sendUpdate();
  };

  const handleDrag = (e, data) => {
    setNotePosition({ ...notePosition, x: data.x, y: data.y });
    sendUpdate();
  };

  const handleStopDrag = (e, data) => {
    setNotePosition({ ...notePosition, zIndex: notePosition.zIndex - 1 });
    sendUpdate();
  };

  return (
    <Draggable
      handle=".class-of-note-mover-element" // this is for you to define, what part of the note do you want to drag by
      grid={[25, 25]} // snapping to grid pixels
      defaultPosition={{ x: 20, y: 20 }} // if no position given
      position={{
        x: notePosition.x, y: notePosition.y, width: yourWidth, height: yourHeight,
      }}
      onStart={handleStartDrag}
      onDrag={handleDrag}
      onStop={handleStopDrag}
    >
      <div className="note">
        {isEditing ? (
          <div className="note">
            <input
              type="text"
              value={title}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="note-title"
            />
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="note-content"
            />
            <div className="note-actions">
              <button className="note-action" type="button" onClick={sendUpdate}>
                Update
              </button>
              <button className="note-action" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="note">
            <h2 className="note-title">{title}</h2>
            <p className="note-content">{text}</p>
            <div className="note-actions">
              <button className="note-action" type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="note-action" type="button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
