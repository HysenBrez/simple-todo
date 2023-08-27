import { SET_USERS, GET_USERS_FAILURE, GET_USERS_REQUEST } from "./actionTypes";
import { User } from "./types";

export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

export const setUsers = (payload: User[]) => ({
  type: SET_USERS,
  payload,
});

export const getUsersFailure = (payload: string) => ({
  type: GET_USERS_FAILURE,
  payload,
});
