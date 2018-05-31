import React from "react";
import { connect } from "react-redux";

import { Time } from "../../../theme";
import { MeetingTitle, MeetingSubtitle } from "./Components";
import { nextMeetingSelector } from "../store/selectors";

const NextMeeting = props => (
  <React.Fragment>
    <MeetingTitle>Next meeting</MeetingTitle>
    <MeetingSubtitle>
      {props.nextMeeting.summary + " "}
      <Time timestamp={props.nextMeeting.startTimestamp} /> - <Time timestamp={props.nextMeeting.endTimestamp} />
    </MeetingSubtitle>
  </React.Fragment>
);

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(NextMeeting);
