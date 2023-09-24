import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, completeTodo, theme, setTodos }) {
  const remainingTodos = todos.filter((todo) => !todo.completed);

  const removeCompletedTodos = () => {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    setTodos(incompleteTodos);
  };

  const [filter, setFilter] = useState('All'); 

  let todosToDisplay = todos;

  if (filter === 'Active') {
    todosToDisplay = todos.filter((todo) => !todo.completed);
  } else if (filter === 'Complete') {
    todosToDisplay = todos.filter((todo) => todo.completed);
  }

  return (
    <div className="TodoMain">
      <div className="TodoList">
        {todosToDisplay.map((todo, index) => (
          <TodoItem
            key={index}
            text={todo.name}
            completed={todo.completed}
            onComplete={() => completeTodo(index)}
            theme={theme}
          />
        ))}
      </div>
      <div className={`manipulate ${theme}Form`}>
        <p>{remainingTodos.length} items left</p>
        <ul className='links'>
          <li onClick={() => setFilter('All')} className={`link ${filter=== 'All' ? 'active' : ''}`}>All</li>
          <li onClick={() => setFilter('Active')} className={`link ${filter=== 'Active' ? 'active' : ''}`}>Active</li>
          <li onClick={() => setFilter('Complete')} className={`link ${filter=== 'Complete' ? 'active' : ''}`}>Complete</li>
        </ul>
        <p onClick={removeCompletedTodos}>Clear Completed</p>
      </div>
    </div>
  );
}

export default TodoList;
