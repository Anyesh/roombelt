import React from "react";
import styled from "styled-components";
import { Text, Input } from "../../../theme";
import StepLayout from "./StepLayout";

const ErrorMessage = styled.p`
  font-size: 12px;
  height: 12px;
  line-height: 1;
  color: red;
  margin-top: 20px;
`;

export default class extends React.PureComponent {
  render = () => (
    <StepLayout img={require("./tablet.png")}>
      <Text large block>
        Connection code
      </Text>
      <Input
        innerRef={input => (this.input = input)}
        onChange={event => this.props.onChangeConnectionCode(event.target.value)}
        onKeyDown={this.onKeyDown.bind(this)}
        value={this.props.connectionCode}
        placeholder="e.g. 12345"
        style={{ marginTop: 15, marginBottom: 10 }}
        error={this.props.connectionError}
      />
      <Text muted small>
        To get connection code open Roombelt website using browser on your tablet and click "Register device".
      </Text>
      <ErrorMessage>{this.props.connectionError}</ErrorMessage>
    </StepLayout>
  );

  onKeyDown = event => {
    if (event.key === "Enter") this.props.onConfirm();
    if (event.key === "Escape") this.props.onCancel();
  };

  focus() {
    this.input.focus();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.connectionError && this.props.connectionError) {
      this.input.focus();
    }
  }
}
