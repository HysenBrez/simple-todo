import { combineReducers } from "redux";

import todoReducer from "./todos/todoReducer";
import usersReducer from "./users/usersReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
