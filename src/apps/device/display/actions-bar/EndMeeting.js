import React from "react";

import { Button, LoaderButton } from "../../../../theme";

export default props => (
  <React.Fragment>
    <Button disabled={props.inProgress} onClick={props.onCancel} white>
      Back
    </Button>
    <LoaderButton isLoading={props.inProgress} onClick={props.onSubmit} danger>
      Confirm
    </LoaderButton>
  </React.Fragment>
);
