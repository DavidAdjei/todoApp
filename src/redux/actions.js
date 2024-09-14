import axios from 'axios';
import { SET_TODOS, SET_USER, SET_AUTH, SET_THEME, SET_LOADING, SET_ERRORS } from "./constants";

export const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const setAuthenticated = (bool) => ({
    type: SET_AUTH,
    payload: bool
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
            const response = await axios.post('https://todo-backend-v2.vercel.app/api/auth/register', credentials);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setAuthenticated(true));
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

export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`https://todo-backend-v2.vercel.app/api/auth/authenticate`, {
                withCredentials: true
            });
            dispatch(setUser(res.data.user));
            dispatch(setAuthenticated(true));
            return Promise.resolve(res.data);
        } catch (err) {
            dispatch(setUser(null));
            dispatch(setAuthenticated(false));
            return Promise.reject(err.response.data);
        }
    }
}

export const login = (credentials) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("https://todo-backend-v2.vercel.app/api/auth/login", credentials);
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
            const response = await axios.get('https://todo-backend-v2.vercel.app/api/todo/' + user_id)
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
        await axios.post('https://todo-backend-v2.vercel.app/api/todo/' + user_id, { description }).then(response => {
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
        await axios.delete('https://todo-backend-v2.vercel.app/api/todo/' + user_id + '/' + todo_id).then(response => {
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
        await axios.delete('https://todo-backend-v2.vercel.app/api/todo/allCompleted/' + user_id ).then(response => {
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
        await axios.put(`https://todo-backend-v2.vercel.app/api/todo/api/todo/completed/${user_id}/${todo_id}`, {completed}).then(response => {
            console.log(response);
        }).catch(err =>{
            console.error('Error:', err);
        })
    }
}

