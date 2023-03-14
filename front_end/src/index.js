import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "~/store";
import { Provider } from "react-redux";
import GlobalStyle from "~/style/GlobalStyle";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
