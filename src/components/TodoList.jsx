import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useTheme } from '../theme/theme';

function TodoList({ todos, completeTodo, setTodos, selectedTodo, deleteSelectedTodo }) {
  const remainingTodos = todos.filter((todo) => !todo.completed);
  const removeCompletedTodos = () => {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    setTodos(incompleteTodos);
  };

  const [theme] = useTheme();

  const [filter, setFilter] = useState('All'); 

  let todosToDisplay = todos;

  if (filter === 'Active') {
    todosToDisplay = todos.filter((todo) => !todo.completed);
  } else if (filter === 'Complete') {
    todosToDisplay = todos.filter((todo) => todo.completed);
  }

  return (
    <div className={`TodoMain`}>
      <div className={`${theme}Shadow`}>
          <div className={`TodoList`}>
          {todosToDisplay.map((todo, index) => (
            <TodoItem
              key={index}
              text={todo.name}
              completed={todo.completed}
              onComplete={() => completeTodo(index)}
              select={() => selectedTodo(index)}
              click = {todo.selected}
              onDelete={() => deleteSelectedTodo(index)}
            />
          ))}
        </div>
        <div className={`manipulate ${theme}Form`}>
          <p>{remainingTodos.length} items left</p>
          <ul className={`links ${theme}hover`}>
            <li onClick={() => setFilter('All')} className={`link ${filter=== 'All' ? 'active' : ''} ${theme}Hover`}>All</li>
            <li onClick={() => setFilter('Active')} className={`link ${filter=== 'Active' ? 'active' : ''} ${theme}Hover`}>Active</li>
            <li onClick={() => setFilter('Complete')} className={`link ${filter=== 'Complete' ? 'active' : ''} ${theme}Hover`}>Complete</li>
          </ul>
          <p onClick={removeCompletedTodos} className='remove'>Clear Completed</p>
        </div>
      </div>
      
      <ul className={`mobileLinks ${theme}Form ${theme}Shadow`}>
          <li onClick={() => setFilter('All')} className={`link ${filter=== 'All' ? 'active' : ''} ${theme}Hover`}>All</li>
          <li onClick={() => setFilter('Active')} className={`link ${filter=== 'Active' ? 'active' : ''} ${theme}Hover`}>Active</li>
          <li onClick={() => setFilter('Complete')} className={`link ${filter=== 'Complete' ? 'active' : ''} ${theme}Hover`}>Complete</li>
      </ul>
    </div>
  );
}

export default TodoList;
