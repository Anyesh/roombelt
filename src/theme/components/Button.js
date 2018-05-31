import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import colors from "../colors";

const defaultColors = css`
  color: #495057;
  background-color: #f0f0f0;
  box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.05);
  border: none;

  &:hover:not([disabled]) {
    background-color: #e0e0e0;
    border-color: rgba(0, 20, 49, 0.12);
  }
`;

const whiteColors = props => {
  if (!props.white) return null;

  return css`
    color: #333;
    background-color: #fff;
    box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.05);
    border: none;

    &:hover:not([disabled]) {
      background-color: #eee;
    }
  `;
};

const variantColors = props => {
  const variantName = Object.keys(colors.variants).find(variantName => props[variantName]);
  if (!variantName) return;

  const variant = colors.variants[variantName];
  return css`
    border-color: ${variant};
    background: ${variant};
    color: ${variant.contrast};
    box-shadow: none;

    &:hover:not([disabled]) {
      background: ${variant.hover};
      border-color: ${variant.hover};
    }
  `;
};

const compactStyles = props => {
  if (!props.compact && !props.small) return;

  return css`
    font-weight: 400;
    padding: calc(var(--font-size) * 0.1) calc(var(--font-size) * 0.4);
    font-size: calc(var(--font-size) * 0.8);
  `;
};

const linkStyles = () => {
  return css`
    border: none;
    box-shadow: none;
    color: ${colors.primary};
    background-color: transparent;

    &:hover:not([disabled]) {
      color: #295a9f;
      text-decoration: underline;
      background-color: transparent;
      border-color: transparent;
    }
  `;
};

const UnderlyingComponent = props =>
  props.href ? (
    <a
      className={props.className}
      children={props.children}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
      style={props.style}
    />
  ) : (
    <button
      className={props.className}
      style={props.style}
      disabled={props.disabled}
      children={props.children}
      onClick={props.onClick}
    />
  );

const Button = styled(UnderlyingComponent)`
  display: ${props => (props.block ? "block" : "inline-block")};
  min-width: calc(var(--font-size) * 6);
  font-size: var(--font-size);
  text-align: center;
  font-family: "Roboto", sans-serif;
  border-radius: var(--radius);
  padding: calc(var(--font-size) * 0.75);
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  ${defaultColors};
  ${whiteColors};
  ${variantColors};
  ${compactStyles};

  ${props => props.link && linkStyles} &[disabled] {
    opacity: 0.65;
    cursor: default;
  }

  ${() => Button} + & {
    ${props => (props.block ? "margin-top: 0.5rem" : "margin-left: 0.75rem;")};
  }
`;

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  link: PropTypes.bool,
  white: PropTypes.bool,

  disabled: PropTypes.bool,
  block: PropTypes.bool,
  compact: PropTypes.bool,
  small: PropTypes.bool
};

export default Button;
