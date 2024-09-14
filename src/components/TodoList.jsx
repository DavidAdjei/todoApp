import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { deleteDoneTodos, deleteTodo, getTodos, handleCheck, setTodos } from '../redux/actions';

function TodoList({ todos, theme, user, getTodos, deleteTodo, handleCheck, deleteDoneTodos }) {
  const [filter, setFilter] = useState('All'); 

  useEffect(() => {
    getTodos(user.id);
  },[getTodos, user])

  let todosToDisplay = todos;

  if (filter === 'Active') {
    todosToDisplay = todos.filter((todo) => !todo.is_completed);
  } else if (filter === 'Complete') {
    todosToDisplay = todos.filter((todo) => todo.is_completed);
  } 

  const onCheck = (isChecked, todo_id) => {
    if (isChecked === 0) {
      handleCheck(user.id, todo_id, true ).then(() => {
        getTodos(user.id)
      })
    } else {
      handleCheck(user.id, todo_id, false).then(() => {
        getTodos(user.id)
      })
    }
  }

  return (
    <div className={`TodoMain`}>
      <div className={`${theme}Shadow`}>
          <div className={`TodoList`}>
          {todosToDisplay.map((todo, index) => (
            <TodoItem
              key={index}
              text={todo.description}
              completed={todo.is_completed === 0 ? false : true}
              onComplete={()=> onCheck(todo.is_completed, todo.id)}
              onDelete={()=> {deleteTodo(user.id, todo.id).then(()=> getTodos(user.id))}}
            />
          ))}
        </div>
        <div className={`manipulate ${theme}Form`}>
          <p> {todosToDisplay.length} items left</p>
          <ul className={`links ${theme}hover`}>
            <li onClick={() => setFilter('All')} className={`link ${filter=== 'All' ? 'active' : ''} ${theme}Hover`}>All</li>
            <li onClick={() => setFilter('Active')} className={`link ${filter=== 'Active' ? 'active' : ''} ${theme}Hover`}>Active</li>
            <li onClick={() => setFilter('Complete')} className={`link ${filter=== 'Complete' ? 'active' : ''} ${theme}Hover`}>Complete</li>
          </ul>
          <p onClick={()=> {deleteDoneTodos(user.id).then(()=> getTodos(user.id))}}  className='remove'>Clear Completed</p>
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

const mapStateToProps = state => ({
  todos: state.todos,
  user: state.user,
  theme: state.theme
})

export default connect(mapStateToProps, {getTodos, setTodos, deleteTodo, handleCheck, deleteDoneTodos })(TodoList);
