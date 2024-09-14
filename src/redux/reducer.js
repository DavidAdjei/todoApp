import { SET_USER, SET_TODOS, SET_THEME, SET_ERRORS, SET_LOADING, SET_AUTH } from "./constants"

const initialState = {
    todos: [],
    user: null,
    isAuth: false,
    theme: 'light',
    loading: false,
    testingError: null
}
export function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case SET_ERRORS:
            return {
                ...state,
                testingError: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}