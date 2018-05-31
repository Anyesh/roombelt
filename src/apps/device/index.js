import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Router from "./router";

class DeviceApp extends React.PureComponent {
  componentDidMount() {
    store.dispatch({ type: ":device--authenticate" });
    store.dispatch({ type: ":device--initialize-clock" });
    store.dispatch({ type: ":device--initialize-heartbeat" });
    store.dispatch({ type: ':device--initialize-full-screen-state' });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default DeviceApp;
