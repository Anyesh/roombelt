import React from "react";
import styled from "styled-components";

import { Card, Text } from "../../theme";

const Highlights = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-bottom: 35px;
`;

const Highlight = props => (
  <Card centerContent>
    <div style={{ fontSize: 35 }}>{props.count}</div>
    <Text muted small>
      {props.title}
    </Text>
  </Card>
);

export default () => (
  <Highlights>
    <Highlight title="Connected devices" count={3} />
    <Highlight title="Events scheduled last week" count={462} />
    <Highlight title="Events cancelled last week" count={6} />
  </Highlights>
);
