import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/NavBar';
import Register from './Pages/Register';
import './App.css';
// import { useTheme } from './theme/theme';
import { getTodos, setTheme, setTodos, checkAuth } from './redux/actions';
import Todos from './Pages/Todos';
import Login from './Pages/Login';


function App({theme, setTheme, isAuth, checkAuth}) {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
    checkAuth()
          .then((res) => {
            console.log(res)
          })
          .catch((e) => {
            console.log(e)
          });
  }, [setTheme, checkAuth])
  
  const [clicked, setClicked] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className={`App ${theme}`}>
      <div className='todo'>
        <Navbar
          title="TODO"
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route exact path='/' element={isAuth ? <Todos setClicked={setClicked} clicked={clicked} /> : <Navigate to='/login'/>} />
          <Route exact path='/register' element={isAuth ? <Navigate to='/'/> : <Register />} /> 
          <Route exact path='/login' element={isAuth ? <Navigate to='/'/> : <Login />}/> 
        </Routes>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  user: state.user,
  theme: state.theme,
  isAuth: state.isAuth
})

export default connect(mapStateToProps, {setTheme, setTodos, getTodos,checkAuth})(App);
