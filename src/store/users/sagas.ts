import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { setUsers, getUsersFailure } from "./actions";
import { GET_USERS_REQUEST } from "./actionTypes";

import { User } from "./types";

const getUsersApi = () => axios.get("https://swapi.dev/api/people");

function* getUsers() {
  try {
    const response: { data: { results: User[] } } = yield call(getUsersApi);

    yield put(setUsers(response.data.results));
  } catch (e: any) {
    yield put(getUsersFailure(e.message));
  }
}

function* userSaga() {
  yield all([takeEvery(GET_USERS_REQUEST, getUsers)]);
}

export default userSaga;
