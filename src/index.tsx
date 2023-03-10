import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { GlobalCss } from "./styled/global";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <GlobalCss />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
