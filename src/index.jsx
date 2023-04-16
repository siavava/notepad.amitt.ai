import React from 'react';
import { createRoot } from 'react-dom';
import './style.scss';
// import $ from 'jquery';

function App() {
  return <div className="test">All the REACT are belong to us!</div>;
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);

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
