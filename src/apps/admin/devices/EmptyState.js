import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Card, Button, Text } from "../../../theme";

const ImageBackground = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto -45px auto;
  background: radial-gradient(
    closest-side,
    rgba(70, 127, 207, 0.5) 0%,
    rgba(70, 127, 207, 0.5) 50%,
    rgba(70, 127, 207, 0.05) 51%,
    rgba(70, 127, 207, 0.05) 99%,
    transparent 100%
  );
`;

const EmptyState = props => (
  <Card block style={{ textAlign: "center" }}>
    <ImageBackground>
      <img src={require("./no-devices.png")} alt="No devices" />
    </ImageBackground>
    <h3>Connect your first device</h3>
    <p>
      <Text block>You have no devices connected. </Text>
      <Text block>Once you connect a device it will appear here.</Text>
    </p>
    <p>
      <Button link href="https://docs.roombelt.com" target="_blank">
        Get help
      </Button>
      <Button primary onClick={props.onConnectDeviceClick}>
        Connect device
      </Button>
    </p>
  </Card>
);

const mapDispatchToProps = dispatch => ({ onConnectDeviceClick: () => dispatch({ type: ":connect-device-wizard--show" }) });

export default connect(null, mapDispatchToProps)(EmptyState);
