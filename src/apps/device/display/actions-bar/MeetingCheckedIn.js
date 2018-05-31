import React from "react";
import { LoaderButton, Button } from "../../../../theme";
import { prettyFormatMinutes } from "../../../../services/formatting";
import ButtonSet from "./ButtonSet";

export default props => {
  const showCustomExtensionTime = props.minutesToNextMeeting > 0 && props.minutesToNextMeeting <= 70;

  const ExtendButton = ({ value }) => (
    <LoaderButton
      white
      disabled={!!props.showLoaderFor}
      onClick={() => props.extendMeeting(value)}
      isLoading={Math.abs(value - props.showLoaderFor) < 2}
      children={"+" + prettyFormatMinutes(value)}
    />
  );

  return (
    <React.Fragment>
      <Button white disabled={!!props.showLoaderFor} onClick={props.endMeeting}>
        End now
      </Button>

      {props.minutesToNextMeeting > 0 && (
        <ButtonSet style={{ marginLeft: 20 }}>
          <Button success disabled children="Extend" />
          {props.minutesToNextMeeting > 20 && <ExtendButton value={15} />}
          {props.minutesToNextMeeting > 40 && <ExtendButton value={30} />}
          {props.minutesToNextMeeting > 70 && <ExtendButton value={60} />}
          {showCustomExtensionTime && <ExtendButton value={props.minutesToNextMeeting} />}
        </ButtonSet>
      )}
    </React.Fragment>
  );
};
