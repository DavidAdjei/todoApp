import React, { useState } from 'react';
import './components.css';
import IconCross from '../assets/images/icon-cross.svg';
import { connect } from 'react-redux';

function TodoItem({ theme, text, completed, onComplete, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);

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

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, {})(TodoItem);
