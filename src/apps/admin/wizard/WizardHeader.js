import React from "react";
import colors from "../../../theme/colors";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background: ${colors.primary};
  color: white;
  padding: 30px;
  font-weight: bold;
`;

const StepNumber = styled.span`
  background: ${props => (props.active ? "white" : colors.primary.hover)};
  color: ${props => (props.active ? colors.primary : "white")};

  display: inline-block;
  box-sizing: border-box;

  width: 22px;
  height: 22px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  margin-right: 5px;
`;

const StepSeparator = styled.span`
  display: inline-block;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  vertical-align: middle;
  margin: 0 15px;
  width: 50px;
`;

export default props => (
  <HeaderWrapper style={props.style}>
    <div>Connect device</div>
    <div style={{ fontSize: 14, marginTop: 20 }}>
      <StepNumber active>1</StepNumber> Connect
      <StepSeparator />
      <StepNumber active={props.currentStep === 1}>2</StepNumber> Configure
    </div>
  </HeaderWrapper>
);
