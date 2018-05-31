import React from "react";
import styled from "styled-components";

import { PageLoaded } from "../../../theme";

import Logo from "../../Logo";
import CardAndFooterLayout from "../../../theme/layouts/CardAndFooter";
import Footer from "../../Footer";

const PageLogo = styled(Logo)`
  margin-bottom: 40px;
  display: block;
`;

const Message = styled.div`
  width: 300px;
  margin: 30px 0;
  font-weight: 300;
`;

export default () => (
  <CardAndFooterLayout footer={<Footer />}>
    <PageLoaded />
    <PageLogo withName size={30} />
    <Message>No calendar has been selected for this device. Go to the administration panel and pick one.</Message>
  </CardAndFooterLayout>
);
