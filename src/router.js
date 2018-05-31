import React from "react";
import Cookie from "js-cookie";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import { getAuth } from "./services/api";
import { setAccessToken } from "./services/access-token";

import FatalError from "./theme/layouts/FatalError";
import LoginApp from "./apps/Login";
import AdminApp from "./apps/admin";
import DeviceApp from "./apps/device";

class Login extends React.PureComponent {
  componentDidMount() {
    if (!this.props.auth.isVerified) return;

    if (this.props.auth.scope === "device") this.props.history.replace("/device");
    if (this.props.auth.scope === "admin") this.props.history.replace("/admin");
  }

  render = () => <LoginApp />;
}

class Admin extends React.PureComponent {
  componentDidMount() {
    if (this.props.auth.scope !== "admin") {
      window.location = this.props.auth.adminUrl;
    }
  }

  render = () => (this.props.auth.scope === "admin" ? <AdminApp /> : null);
}

class Device extends React.PureComponent {
  render = () => <DeviceApp />;
}

class Router extends React.PureComponent {
  state = { auth: null, error: false };

  async componentDidMount() {
    const newAccessToken = Cookie.get("accessToken");

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      Cookie.remove("accessToken");
    }

    while (true) {
      try {
        this.setState({ auth: await getAuth(), error: false });
        break;
      } catch (err) {
        this.setState({ error: true });
        await new Promise(res => setTimeout(res, 5000));
      }
    }
  }

  render() {
    if (this.state.error) {
      return <FatalError title="Unable to connect to the server" message="Check internet connection and try again" />;
    }

    if (this.state.auth) {
      return (
        <Switch>
          <Route exact path={"/"} render={() => <Login auth={this.state.auth} history={this.props.history} />} />
          <Route exact path={"/device"} render={() => <Device auth={this.state.auth} history={this.props.history} />} />
          <Route exact path={"/admin"} render={() => <Admin auth={this.state.auth} history={this.props.history} />} />
        </Switch>
      );
    }

    return null;
  }
}

export default withRouter(Router);
