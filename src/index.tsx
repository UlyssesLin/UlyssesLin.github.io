import * as React from "react"
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import { thunk } from "redux-thunk"

import App from "./App"
import reducer from "./store/reducer"
import reportWebVitals from "./reportWebVitals";

const store: Store<DashboardState> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
