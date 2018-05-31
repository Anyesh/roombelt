import styled from "styled-components";
import { Button } from "../../../../theme";

export default styled.div`
  display: inline-block;

  & ${Button} {
    border-radius: 0;
  }

  & ${Button} + ${Button} {
    margin-left: 0;
  }
`;
