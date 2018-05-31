import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = styled.span`
  background: #467fcf;
  color: white;
  border-radius: 0.3em;
  display: inline-block;
  vertical-align: -0.1em;
  height: 1em;
  width: 1em;
  line-height: 1em;
  margin-right: 0.05em;
  text-align: center;
  font-weight: 300;
`;

const Name = styled.span`
  vertical-align: middle;
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Logo = props => (
  <span
    onClick={props.onClick}
    className={props.className}
    style={{
      cursor: props.onClick ? "pointer" : "inherit",
      fontSize: props.size,
      color: props.color,
      textAlign: "center",
      ...props.style
    }}
  >
    <Icon color={props.color}>r</Icon>
    {props.withName && <Name>oombelt</Name>}
  </span>
);

Logo.propTypes = {
  withName: PropTypes.bool,
  color: PropTypes.string
};

Logo.defaultProps = {
  color: "black"
};

export default Logo;
