import React from 'react';
import './components.css'; // Import the CSS file

function TodoItem({ text, completed, onComplete, theme }) {
  return (
    <div className={`TodoItem ${theme}Form`}>
      <div onClick={onComplete} className={`checkContainer ${completed ? 'checkBackground' : ''}`}>
        <span className={`checkmark ${completed ? '' : 'hide'}`}></span>
      </div>
      <span className={`inputField ${completed ? 'completed' : ''} `}>{text}</span>
    </div>
  );
}

export default TodoItem;
