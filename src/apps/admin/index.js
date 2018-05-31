import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Dashboard from "./Dashboard";

class AdminApp extends React.PureComponent {
  componentDidMount() {
    store.dispatch({ type: ":initial-data--fetch" });
  }

  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

export default AdminApp;
