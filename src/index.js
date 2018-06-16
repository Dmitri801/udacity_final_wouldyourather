import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
      />
    </div>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
