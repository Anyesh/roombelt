import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  justify-content: space-between;
  grid-gap: 20px;
  padding: 30px 0 0 30px;
  margin: 0;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
`;

export default props => (
  <Wrapper>
    <div>{props.children}</div>
    <img src={props.img} alt="" height="100%" />
  </Wrapper>
);
