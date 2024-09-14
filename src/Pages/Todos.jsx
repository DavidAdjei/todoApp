import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { setTodos } from '../redux/actions';

export const Todos = ({setClicked, clicked, todos, setTodos}) => {
  return (
        <div className='todoComponent'>
          <TodoForm
            setClicked={setClicked}
            clicked={clicked}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
          />
        </div>

  )
}

Todos.propTypes = {
    setTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    user: state.user,
    error: state.error,
    testingError: state.testingError
})


export default connect(mapStateToProps, {setTodos})(Todos)