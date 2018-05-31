import React from "react";
import { connect } from "react-redux";

import IoPlusRound from "react-icons/lib/io/plus";
import { PageTitle, Button } from "../../theme";

const ConnectDeviceButton = props => (
  <Button primary compact style={{ marginLeft: 10 }} onClick={props.onClick}>
    <IoPlusRound /> <span style={{ verticalAlign: "middle" }}>Connect device</span>
  </Button>
);

const DevicesHeader = props => (
  <PageTitle style={{ display: "flex", justifyContent: "space-between" }}>
    Dashboard
    {props.hasAnyDevices && <ConnectDeviceButton onClick={props.onConnectDeviceClick} />}
  </PageTitle>
);

const mapStateToProps = state => ({
  hasAnyDevices: state.devices.data.length > 0
});

const mapDispatchToProps = dispatch => ({
  onConnectDeviceClick: () => dispatch({ type: ":connect-device-wizard--show" })
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicesHeader);
