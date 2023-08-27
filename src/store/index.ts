import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer, { RootState } from "./rootReducer";
import rootSaga from "./rootSaga";
import { Todo } from "./todos/types";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    {
      in: (state: RootState["todos"], key: any) => {
        if (key !== "todos") return state;

        const modifiedState = {
          ...state,
          list: state.list.filter((todo: Todo) => {
            const now = new Date();
            const createdAtDate = todo.createdAt
              ? new Date(todo.createdAt)
              : null;

            return (
              createdAtDate &&
              createdAtDate.toDateString() === now.toDateString()
            );
          }),
        };

        return modifiedState;
      },
      out: (state: RootState) => state,
      whitelist: ["todos"],
    },
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Mount it on the Store
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(rootSaga);

// Persist the store
const persistor = persistStore(store);

export { store, persistor };
