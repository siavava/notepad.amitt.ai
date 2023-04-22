import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import { produce } from 'immer';

function App() {
  const [notes, setNotes] = useState({});

  const addNote = (newNote) => {
    setNotes(
      produce((draft) => {
        draft[newNote.id] = newNote;
      }),
    );
  };

  const deleteNote = (id) => {
    setNotes(
      produce((draft) => {
        delete draft[id];
      }),
    );
  };

  const updateNote = (id, updates) => {
    setNotes(
      produce((draft) => {
        draft[id] = { ...draft[id], ...updates };
      }),
    );
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);

function About(props) {
  return <div className="route-text"> All there is to know about me </div>;
}

function Welcome(props) {
  return <div className="route-text"> Welcome to my site. </div>;
}

function Nav(props) {
  return (
    <nav className="nav">
      <ul className="nav-links">
        <li><NavLink className="nav-link" to="/">Home</NavLink></li>
        <li><NavLink className="nav-link" to="/about">About</NavLink></li>
        <li><NavLink className="nav-link" to="/test/id1">test id1</NavLink></li>
        <li><NavLink className="nav-link" to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
}

function Test(props) {
  const { id } = useParams();
  return <div className="route-text"> This is a test route with ID {id} </div>;
}

// code to follow mouse... from ported from the starter.
const tracker = document.getElementById('tracker');
document.body.onpointermove = (event) => {
  const { pageX, pageY } = event;
  tracker.animate({
    top: `${pageY - 200}px`,
    left: `${pageX - 200}px`,
  }, {
    duration: 3000,
    fill: 'forwards',
  }, 'ease-in-out');
};
