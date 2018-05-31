import React from "react";
import { Badge } from "../../../theme";
import { prettyFormatMinutes } from "../../../services/formatting";
import { MeetingHeader, MeetingSubtitle } from "./Components";
import { connect } from "react-redux";
import { nextMeetingSelector, minutesToNextMeetingSelector } from "../store/selectors";

const RoomAvailable = props => {
  const nextMeetingStartTimestamp = props.nextMeeting && props.nextMeeting.startTimestamp;
  const availability = nextMeetingStartTimestamp
    ? `Available for ${prettyFormatMinutes(props.minutesToNextMeeting)}`
    : "Available whole day";

  return (
    <React.Fragment>
      <MeetingHeader>
        <Badge success>Available</Badge>
      </MeetingHeader>
      <MeetingSubtitle>{availability}</MeetingSubtitle>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state),
  minutesToNextMeeting: minutesToNextMeetingSelector(state)
});

export default connect(mapStateToProps)(RoomAvailable);
