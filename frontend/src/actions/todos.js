import axios from "axios";
import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO,
  GET_ERRORS,
} from "./types";

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
  axios
    .get("/api/v1/todos/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.stats,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// DELETE TODO
export const deleteTodo = (todo) => (dispatch, getState) => {
  axios
    .delete(`/api/v1/todos/${todo.id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteTodo: "Todo deleted" }));
      dispatch({
        type: DELETE_TODO,
        payload: todo.id,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.stats,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// ADD TODO
export const addTodo = (todo) => (dispatch, getState) => {
  axios
    .post("/api/v1/todos/", todo, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addTodo: "Todo added" }));
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.stats,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// UPDATE TOTO
export const updateTodo = (todo) => (dispatch, getState) => {
  axios
    .put(`/api/v1/todos/${todo.id}/`, todo, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_TODO,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.stats,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
