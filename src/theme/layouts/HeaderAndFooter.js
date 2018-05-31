import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

const Section = styled.div`
  background: ${props => props.background};
  padding: ${props => props.padding}px 0;

  ${props => (props.borderTop ? "border-top: 1px solid rgba(0, 40, 100, 0.12)" : "none")};
  ${props => (props.borderBottom ? "border-bottom: 1px solid rgba(0, 40, 100, 0.12)" : "none")};
`;

const Responsive = styled.div`
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
  }
`;

export default props => (
  <Layout>
    {props.header && (
      <Section background={"white"} borderBottom padding={15}>
        <Responsive>{props.header}</Responsive>
      </Section>
    )}

    <Section background={"#f5f7fb"} padding={20}>
      <Responsive>{props.children}</Responsive>
    </Section>

    {props.footer && (
      <Section background={"white"} borderTop padding={15}>
        <Responsive>{props.footer}</Responsive>
      </Section>
    )}
  </Layout>
);
