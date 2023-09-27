import React, { useState } from 'react';
import './components.css';
import IconCross from '../assets/images/icon-cross.svg';
import { useTheme } from '../theme/theme';

function TodoItem({ text, completed, onComplete, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const [theme] = useTheme();

  return (
    <div
      className={`TodoItem ${theme}Form`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className='TodoContent'>
        <div onClick={onComplete} className={`checkContainer ${completed ? 'checkBackground' : ''}`}>
        <span className={`checkmark ${completed ? '' : 'hide'}`}></span>
        </div>
        <span className={`inputField ${completed ? 'completed' : ''} `}>{text}</span>
      </div>
      <button onClick={onDelete} className={`delete ${showDelete ? '' : 'hide'}`}>
        <img src={IconCross} alt="cross" />
      </button>
    </div>
  );
}

export default TodoItem;
