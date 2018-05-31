import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardWrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: content-box;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  font-size: var(--font-size);

  display: ${props => (props.block ? "block" : "inline-block")};
`;

const CardHeader = styled.div`
  border-radius: 2px 2px 0 0;
  padding: 15px;
  font-size: calc(var(--font-size) * 1.2);
  line-height: 1.2;
  border-bottom: 1px solid rgba(0, 40, 100, 0.12);
`;

const CardFooter = styled.div`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: 15px;
  border-radius: 0 0 2px 2px;
`;

const CardContent = styled.div`
  padding: ${props => (props.compact ? "0" : "25px 15px")};
  text-align: ${props => (props.centerContent ? "center" : "inherit")};
`;

const Card = props => (
  <CardWrapper style={props.style} block={props.block}>
    {props.header && <CardHeader>{props.header}</CardHeader>}
    <CardContent compact={props.compact} centerContent={props.centerContent}>
      {props.children}
    </CardContent>
    {props.footer && <CardFooter>{props.footer}</CardFooter>}
  </CardWrapper>
);

Card.propTypes = {
  block: PropTypes.bool,
  compact: PropTypes.bool,
  centerContent: PropTypes.bool
};

export default Card;
