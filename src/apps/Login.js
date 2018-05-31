import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, PageLoaded } from "../theme";
import Logo from "./Logo";
import Footer from "./Footer";
import CardAndFooterLayout from "../theme/layouts/CardAndFooter";

const PageLogo = styled(Logo)`
  margin-bottom: 40px;
  display: block;
`;

const MenuButton = Button.withComponent(props => (
  <Link className={props.className} to={props.to} children={props.children} />
)).extend`
  width: calc(100vw - 100px);
  max-width: 300px;
  margin: 20px 0;
`;

export default props => (
  <CardAndFooterLayout footer={<Footer />}>
    <PageLoaded />
    <PageLogo withName size={30} />
    <MenuButton block primary to={"/admin"}>
      Log in to admin panel
    </MenuButton>
    <MenuButton block to={"/device"}>
      Register device
    </MenuButton>
  </CardAndFooterLayout>
);
