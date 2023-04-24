import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

// Why does ESLINT complain if this is an arrow function?
export default function NewNoteBar(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    props.search(title, text);
  }, [title, text]);

  const clearFields = () => {
    setTitle('');
    setText('');
  };

  const saveNote = () => {
    props.addNote({ title, text });
    clearFields();
  };

  const focusOn = (id) => () => {
    const note = document.getElementById(`${id}`); // .focus();
    note.focus();
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
          <img src="/images/add-note.svg" className="icon" alt="add note" />
        </button>
        <button className="note-action" type="button" onClick={clearFields}>
          <img src="/images/cancel-add-note.svg" className="icon" alt="cancel" />
        </button>
      </div>
      )}
      {/* if title has some text, show search results  */}
      {title
      && (
      <div className="search-results">
        { props.searchResults.map(([id, result]) => (
          <button className="search-result" key={id} type="button" onClick={focusOn(id)}>
            <div className="search-result-title">{result.title}</div>
            <ReactMarkdown className="search-result-text">{result.text || ''}</ReactMarkdown>
          </button>
        ))}
      </div>
      )}
    </div>
  );
}
