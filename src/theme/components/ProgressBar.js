import PropTypes from "prop-types";
import styled  from "styled-components";

import colors from "../colors";

const ProgressBar = styled.span`
  display: block;
  width: 100%;
  height: ${props => (props.small ? "0.25rem" : "0.5rem")};
  background-color: #e9ecef;
  border-radius: 3px;
  position: relative;

  &:after {
    content: "";
    display: block;
    border-radius: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: ${props => props.value || 0}%;
    background-color: ${props => {
      const variant = Object.keys(colors.variants).find(variantName => props[variantName]);
      return colors.variants[variant || "success"];
    }};
  }
`;

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  info: PropTypes.bool,
  small: PropTypes.bool
};

export default ProgressBar;
