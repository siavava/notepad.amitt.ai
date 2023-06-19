import React, { useState, useEffect, ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { NoteType } from '../types';

interface NewNoteBarProps {
  search: Function;
  addNote: Function;
  searchResults: Map<string, NoteType>;
}
// Why does ESLINT complain if this is an arrow function?
export default function NewNoteBar(props: NewNoteBarProps) {
  const { search, addNote, searchResults } = props;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  };

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    setText(target.value);
  };

  useEffect(() => {
    search(title, text);
  }, [title, text]);

  const clearFields = () => {
    setTitle('');
    setText('');
  };

  const saveNote = () => {
    addNote({ title, text });
    clearFields();
  };

  const focusOn = (id: string) => () => {
    const note = document.getElementById(`${id}`)!; // .focus();
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
        {
          /* note: I kept getting a warning from  eslint that
          specifying `type` implicitly specifies role,
          hence I shouldn't specify role unless
          it is different from type. */
        }
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
        { [...searchResults.entries()].map(([id, result]) => (
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
