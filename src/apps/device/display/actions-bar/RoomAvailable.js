import React from "react";
import { Button, LoaderButton } from "../../../../theme";
import { prettyFormatMinutes } from "../../../../services/formatting";
import ButtonSet from "./ButtonSet";

export default props => {
  const CreateButton = ({ value }) => (
    <LoaderButton
      white
      disabled={!!props.showLoaderFor}
      onClick={() => props.createMeeting(value)}
      isLoading={Math.abs(value - props.showLoaderFor) < 2}
      children={prettyFormatMinutes(value)}
    />
  );

  return (
    <ButtonSet>
      <Button disabled success children="Start" />
      {props.minutesToNextMeeting > 20 && <CreateButton value={15} />}
      {props.minutesToNextMeeting > 40 && <CreateButton value={30} />}
      {props.minutesToNextMeeting > 70 && <CreateButton value={60} />}
      {props.minutesToNextMeeting > 130 && <CreateButton value={120} />}
      {props.minutesToNextMeeting <= 130 && <CreateButton value={props.minutesToNextMeeting} />}
    </ButtonSet>
  );
};
