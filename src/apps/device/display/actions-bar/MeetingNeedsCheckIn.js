import React from "react";
import { LoaderButton, Button } from "../../../../theme";

export default props => (
  <React.Fragment>
    <LoaderButton onClick={props.checkInToMeeting} primary isLoading={props.inProgress}>
      {props.hasStarted ? "Check-in" : "Start early"}
    </LoaderButton>
    <Button white onClick={props.cancelMeeting}>
      Cancel meeting
    </Button>
  </React.Fragment>
);
