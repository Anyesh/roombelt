import React from "react";
import StepLayout from "./StepLayout";
import { Text } from "../../../theme";

import Select from "react-select";
import "react-select/dist/react-select.css";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  focus() {
    this.select.current.focus();
  }

  render = () => (
    <StepLayout img={require("./calendar.png")}>
      <Text large block>
        Calendar
      </Text>
      <Select
        instanceId="edit-device-choose-calendar"
        value={this.props.calendarId}
        options={Object.values(this.props.calendars).map(calendar => ({
          value: calendar.id,
          label: calendar.summary + (calendar.canModifyEvents ? '' : ' (read only)'),
          disabled: !calendar.canModifyEvents
        }))}
        onChange={event => this.props.onSetCalendar(event && event.value)}
        style={{ marginTop: 15, marginBottom: 10 }}
        ref={this.select}
      />
      <Text muted small>
        Pick a calendar that will be shown on this device. You can leave it empty and set the calendar later.
      </Text>
    </StepLayout>
  );
}
