import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// Why does ESLINT complain if this is an arrow function?
function NewNoteBar(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const clearFields = () => {
    setTitle('');
    setText('');
  };

  const saveNote = () => {
    props.addNote({ title, text });
    clearFields();
  };

  return (
    <div id="new-note-bar">
      <input className="new-note-title" onChange={onTitleChange} value={title} placeholder="Search or Add..." />
      {/* if title has some text, show body text input  */}
      {title
      && <TextareaAutosize className="new-note-text" onChange={onTextChange} value={text} placeholder="Add body text (optional)" /> }
      { title
      && (
      <div className="note-actions">
        <button className="note-action" type="button" onClick={saveNote}>
          <img src="assets/add-note.svg" className="icon" alt="add note" />
        </button>
        <button className="note-action" type="button" onClick={clearFields}>
          <img src="assets/cancel-add-note.svg" className="icon" alt="cancel" />
        </button>
      </div>
      )}
    </div>
  );
}

export default NewNoteBar;
