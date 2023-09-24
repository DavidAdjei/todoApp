import React, { useState } from 'react';
import Navbar from './components/NavBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const [todos, setTodos] = useState([
    {
      name: 'Jog around the park 3x',
      completed: false
    },
    {
      name: '10 minutes meditation',
      completed: false
    },
    {
      name: 'Read for 1 hour',
      completed: false
    },
    {
      name: 'Pick up groceries',
      completed: false
    },
    {
      name: 'Complete App Apps on Frontend Mentor',
      completed: false
    },

  ]);
  const [theme, setTheme] = useState('dark')
   const [clicked, setClicked] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTodo = (name) => {
    const newTodo = { name, completed: false };
    setTodos([...todos, newTodo]);
    setClicked(false);
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <main className={`App ${theme}`}>
      <div className='todo'>
        <Navbar title="TODO" toggleTheme={toggleTheme} theme={theme} />
        <div className='todoComponent'>
          <TodoForm addTodo={addTodo} theme={theme} setClicked={ setClicked} clicked={clicked} />
          <TodoList todos={todos} completeTodo={completeTodo} theme={theme} setTodos={setTodos}/>
        </div>
        
      </div>
    </main>
  );
}

export default App;
