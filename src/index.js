import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
