import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "./fonts/index.css";

ReactDOM.render(<BrowserRouter children={<Router />} />, document.querySelector("#root"));
registerServiceWorker();
