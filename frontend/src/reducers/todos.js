import {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO,
} from "../actions/types.js";

const intialState = {
  todos: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          } else {
            return todo;
          }
        }),
      };
    default:
      return state;
  }
}
