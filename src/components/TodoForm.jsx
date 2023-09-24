import React, { useState } from 'react';

function TodoForm({ addTodo, theme, setClicked, clicked }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === '') return;
    setClicked(!clicked);
    addTodo(todoText);
    setTodoText('');
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
