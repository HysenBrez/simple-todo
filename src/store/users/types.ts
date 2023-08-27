import { SET_USERS, GET_USERS_FAILURE } from "./actionTypes";

export interface User {
  name: string;
  url: string;
}

export interface UsersState {
  list: User[];
  error: string | null;
}

export interface SetUsers {
  type: typeof SET_USERS;
  payload: User[];
}

export interface GetUsersFailure {
  type: typeof GET_USERS_FAILURE;
  payload: string;
}

export type UsersActionTypes = SetUsers | GetUsersFailure;
