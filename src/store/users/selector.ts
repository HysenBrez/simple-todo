import { createSelector } from "reselect";
import { UsersState } from "./types";

const getUsers = (state: UsersState) => state.list;

export const getUsersSelector = createSelector(getUsers, (users) => users);
