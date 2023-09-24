import React, { useState } from 'react';
import './components.css';
import IconCross from '../assets/images/icon-cross.svg';

function TodoItem({ text, completed, onComplete, theme, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={`TodoItem ${theme}Form`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div onClick={onComplete} className={`checkContainer ${completed ? 'checkBackground' : ''}`}>
        <span className={`checkmark ${completed ? '' : 'hide'}`}></span>
      </div>
      <span className={`inputField ${completed ? 'completed' : ''} `}>{text}</span>
      <button onClick={onDelete} className={`${showDelete ? '' : 'hide'}`}>
        <img src={IconCross} alt="cross" />
      </button>
    </div>
  );
}

export default TodoItem;
