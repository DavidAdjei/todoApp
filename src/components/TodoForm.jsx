import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos } from '../redux/actions';

function TodoForm({ theme, addTodo, setClicked, clicked, getTodos, user }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === '') {
      alert('Can not submit empty todo')
    } else {
      setClicked(!clicked);
      addTodo(user.id, todoText).then(() => {
        getTodos(user.id);
        setTodoText('');
        setClicked(false)
        
      }).catch((err) => {
        console.log(err)
      });;
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

const mapStateToProps = (state) => ({
  user: state.user,
  theme: state.theme
})

export default connect(mapStateToProps, {addTodo, getTodos})(TodoForm);
