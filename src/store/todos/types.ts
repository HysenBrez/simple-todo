import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actionTypes";

export interface Todo {
  id?: string;
  text: string;
  status?: "todo" | "in_progress" | "done";
  createdAt?: Date;
  user?: string;
}

export interface TodoState {
  list: Todo[];
}

export interface AddTodo {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface EditTodo {
  type: typeof EDIT_TODO;
  payload: Todo;
}

export interface DeleteTodo {
  type: typeof DELETE_TODO;
  payload: string;
}

export type TodoActionTypes = AddTodo | EditTodo | DeleteTodo;
