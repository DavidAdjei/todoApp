import React, { useState } from 'react';
import { useTheme } from '../theme/theme';

function TodoForm({ addTodo, setClicked, clicked }) {
  const [todoText, setTodoText] = useState('');
  const [theme] = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === '') {
      alert('Can not submit empty todo')
    } else {
      setClicked(!clicked);
      addTodo(todoText);
      setTodoText('');
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className={`TodoForm ${theme}Form`}>
      <div onClick={handleSubmit} className={`checkContainer ${clicked ? 'checkBackground' : ''}`}>
        <span className={`checkmark ${clicked ? '' : 'hide'}`}></span>
      </div>
      <input
        className={`inputField ${theme}Field`}
        type="text"
        placeholder="Create a new todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
