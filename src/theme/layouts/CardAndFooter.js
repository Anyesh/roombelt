import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Footer = styled.div`
  background: white;
  padding: 15px;
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  align-self: stretch;
`;

export default props => (
  <Layout>
    <Content>
      <Card centerContent>{props.children}</Card>
    </Content>
    {props.footer && <Footer>{props.footer}</Footer>}
  </Layout>
);
