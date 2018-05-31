import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import colors from "../colors";

const Text = styled(props => <span style={props.style} className={props.className} children={props.children} />)`
  color: ${colors.foreground};

  ${props => (props.muted ? "color: " + colors.muted : "")};
  ${props => (props.small ? "font-size: 87.5%" : "")};
  ${props => (props.xsmall ? "font-size: 70%" : "")};
  ${props => (props.large ? "font-size: 110%" : "")};
  ${props => (props.block ? "display: block" : "")};
`;

Text.propTypes = {
  muted: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  xsmall: PropTypes.bool,
  block: PropTypes.bool
};

export default Text;
