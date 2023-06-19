import React, { useState } from 'react';
// import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd'; // supports dragging AND resizing
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

export default function Note(props) {
  const {
    id, note, updateNote, deleteNote,
  } = props;
  const [isEditing, setIsEditing] = useState(false);

  const updateTitle = (newTitle) => {
    updateNote(id, { title: newTitle });
  };

  const updateText = (newText) => {
    updateNote(id, { text: newText });
  };

  const handleDrag = (e, data) => {
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

  /**
   * Sets editing mode to false.
   */
  const finishEditing = () => {
    setIsEditing(false);
  };

  /**
   * Brings the note to the front of the stack.
   */
  const elevate = () => {
    if (note.z !== props.highestZIndex) {
      updateNote(id, { z: props.highestZIndex + 1 });
    }
  };

  return (
    <Rnd
      size={{ width: note.width, height: note.height }}
      position={{ x: note.x, y: note.y }}
      minWidth="300px"
      minHeight="300px"
      onDrag={handleDrag}
      onResize={handleResize}
      onDragStart={elevate}
      onResizeStart={elevate}
      className={props.highlighted ? 'note highlighted' : 'note'}
      style={{ zIndex: note.z }}
      id={id}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={note.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="note-title-input"
          />
          <TextareaAutosize
            value={note.text}
            onChange={(e) => updateText(e.target.value)}
            className="note-text-input"
          />
          <div className="note-actions">
            <button className="note-action" type="button" onClick={finishEditing}>
              <img src="/images/tick.svg" className="icon" alt="save" />
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="note-title">{note.title}</h2>
          <ReactMarkdown className="note-text">{note.text || ''}</ReactMarkdown>
          <div className="note-actions">
            <button className="note-action" type="button" onClick={() => setIsEditing(true)}>
              <img src="/images/edit.svg" className="icon" alt="edit" />
            </button>
            <button className="note-action" type="button" onClick={deleteNote}>
              <img src="/images/delete.svg" className="icon" alt="edit" />
            </button>
          </div>
        </>
      )}
    </Rnd>
  );
}
