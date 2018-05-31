import styled, { keyframes } from "styled-components";

const rotation = keyframes`
100% { transform: rotate(360deg); }
`;

export default styled.div`
  display: inline-block;
  height: calc(var(--font-size) * 2.5);
  width: calc(var(--font-size) * 2.5);
  color: ${props => (props.white ? "white" : "#467fcf")};
  position: relative;

  &:before,
  &:after {
    display: inline-block;
    box-sizing: border-box;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  &:before {
    border-radius: 50%;
    border: calc(var(--font-size) * 0.2) solid currentColor;
    opacity: 0.15;
  }

  &:after {
    border: calc(var(--font-size) * 0.2) solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: infinite ${rotation} 0.6s linear;
  }
`;
