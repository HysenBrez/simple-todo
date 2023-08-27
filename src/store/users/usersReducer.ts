import { SET_USERS, GET_USERS_FAILURE } from "./actionTypes";
import { UsersActionTypes, UsersState } from "./types";

const initialState: UsersState = {
  list: [],
  error: null,
};

const reducers = (state = initialState, action: UsersActionTypes) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        list: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
