import PropTypes from "prop-types";
import styled from "styled-components";

import colors from "../colors";

const StatusIcon = styled.span`
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  border-radius: 50%;
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
  margin-right: 0.375rem;
  vertical-align: middle;

  background-color: ${props => {
    const variant = Object.keys(colors.variants).find(variantName => props[variantName]);
    return colors.variants[variant || "success"];
  }};
`;

StatusIcon.propTypes = {
  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  info: PropTypes.bool
};

export default StatusIcon;
