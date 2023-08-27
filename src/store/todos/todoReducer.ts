import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "./actionTypes";
import { TodoActionTypes, TodoState } from "./types";
import { v4 as uuid } from "uuid";

const initialState: TodoState = {
  list: [],
};

const reducers = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
            createdAt: new Date(),
            id: uuid(),
            status: "todo" as const,
          },
        ],
      };
    case EDIT_TODO:
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              ...action.payload,
            };
          }
          return todo;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducers;
