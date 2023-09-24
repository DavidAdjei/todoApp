import React, { useState } from 'react';
import Navbar from './components/NavBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const [todos, setTodos] = useState([
    {
      name: 'Jog around the park 3x',
      completed: false,
      selected: false
    },
    {
      name: '10 minutes meditation',
      completed: false,
      selected: false
    },
    {
      name: 'Read for 1 hour',
      completed: false,
      selected: false
    },
    {
      name: 'Pick up groceries',
      completed: false,
      selected: false
    },
    {
      name: 'Complete App Apps on Frontend Mentor',
      completed: false,
      selected: false
    },
  ]);

  const [clickedTodo, setClickedTodo] = useState(null)

  const [theme, setTheme] = useState('dark')
  const [clicked, setClicked] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTodo = (name) => {
    const newTodo = { name, completed: false, selected:false };
    setTodos([...todos, newTodo]);
    setClicked(false)
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const selectedTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          selected: !todo.selected,
        };
      } else {
        return {
          ...todo,
          selected: false,
        };
      }
    });
   const selected = updatedTodos.find((todo) => todo.selected);
    setClickedTodo(selected);
    setTodos(updatedTodos);
  };
  

  function deleteTodo(index) {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  }

  return (
    <main className={`App ${theme}`}>
      <div className='todo'>
        <Navbar
          title="TODO"
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <div className='todoComponent'>
          <TodoForm
            addTodo={addTodo}
            theme={theme}
            setClicked={setClicked}
            clicked={clicked}
          />
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            theme={theme}
            setTodos={setTodos}
            selectedTodo={selectedTodo}
            deleteSelectedTodo={deleteTodo} 
          />
        </div>
        
      </div>
    </main>
  );
}

export default App;
