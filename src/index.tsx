import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import Error from "./components/Error";
import { AppRoutes } from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function logErrorToService(error: any, info: any) {
  // Use your preferred error logging service
  console.error("Caught an error:", error, info);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary fallback={<Error />} onError={logErrorToService}>
          <BrowserRouter>
            <Header />
            <AppRoutes />
          </BrowserRouter>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
