import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actionTypes";
import { Todo } from "./types";

export const addTodo = (payload: Todo) => ({
  type: ADD_TODO,
  payload,
});

export const editTodo = (payload: Todo) => ({
  type: EDIT_TODO,
  payload,
});

export const deleteTodo = (payload: string) => ({
  type: DELETE_TODO,
  payload,
});
