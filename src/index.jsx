import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import Notes from './Notes';

function App() {
  return (
    <div className="app-container">
      <Notes />
    </div>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
