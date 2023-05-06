import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 4000,
  transition: transitions.SCALE,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
