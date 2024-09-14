import axios from 'axios';
import { SET_TODOS, SET_USER, SET_TOKEN, SET_THEME, SET_LOADING, SET_ERRORS } from "./constants";

export const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
})

export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
})

export const setErrors = (error) => ({
    type: SET_ERRORS,
    payload: error
})


export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const createUser = (credentials) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setToken(response.data.token));
                dispatch(setErrors(null)); 
                dispatch(setLoading(false));
                return Promise.resolve();
            } else {
                dispatch(setErrors(response.data.error));
                dispatch(setLoading(false));
                return Promise.reject(response.data.error); 
            }
        } catch (err) {
            dispatch(setErrors(err.response ? err.response.data.error : 'Unknown error occurred'));
            console.error('Error:', err);
            dispatch(setLoading(false));
            return Promise.reject(err);
        }
    }
}
export const login = (credentials) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setToken(response.data.token));
                dispatch(setErrors(null));
                return Promise.resolve();
            } else {
                dispatch(setErrors(response.data.error));
                return Promise.reject(response.data.error); 
            }
        } catch(err) {
            dispatch(setErrors(err.response.data.error));
            console.log(err);
            return Promise.reject(err.response.data.error);
        }
    }
}



export const getTodos = (user_id) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await axios.get('http://localhost:5000/api/todo/' + user_id)
            dispatch(setTodos(response.data.todos))
        }catch (err) {
            console.error('Error:', err);
        }finally {
            dispatch(setLoading(false))
        }
    }
}

export const addTodo = (user_id, description) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        await axios.post('http://localhost:5000/api/todo/' + user_id, { description }).then(response => {
            console.log(response);
        }).catch(err =>{
            console.error('Error:', err);
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
}

export const deleteTodo = (user_id, todo_id) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        await axios.delete('http://localhost:5000/api/todo/' + user_id + '/' + todo_id).then(response => {
            console.log(response);
        }).catch(err =>{
            console.error('Error:', err);
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
}

export const deleteDoneTodos = (user_id) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        await axios.delete('http://localhost:5000/api/todo/allCompleted/' + user_id ).then(response => {
            console.log(response);
        }).catch(err => {
            console.error('Error:', err);
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
}

export const handleCheck = (user_id, todo_id, completed) => {
    return async (dispatch) => {
        await axios.put('http://localhost:5000/api/todo/completed/' + user_id + '/' + todo_id, {completed}).then(response => {
            console.log(response);
        }).catch(err =>{
            console.error('Error:', err);
        })
    }
}

