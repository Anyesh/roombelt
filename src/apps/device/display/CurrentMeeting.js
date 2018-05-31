import React from "react";
import { connect } from "react-redux";
import { pluralize } from "../../../services/formatting";
import { Badge, Time } from "../../../theme";
import { MeetingHeader, MeetingTitle, MeetingSubtitle } from "./Components";
import { currentMeetingSelector, nextMeetingSelector } from "../store/selectors";

const CurrentMeeting = props => {
  const { attendees, organizer, isCheckedIn, startTimestamp, endTimestamp, summary } = props.currentMeeting;

  const guestsCount = attendees.filter(u => u.displayName !== organizer.displayName).length;
  const fromStart = Math.floor((props.currentTimestamp - startTimestamp) / 1000 / 60);

  return (
    <React.Fragment>
      <MeetingHeader>
        {isCheckedIn && <Badge danger>Occupied</Badge>}
        {!isCheckedIn && fromStart === 0 && <Badge info>Starts now</Badge>}
        {!isCheckedIn && fromStart > 0 && <Badge warning>Started {pluralize(fromStart, "minute")} ago</Badge>}
        {!isCheckedIn && fromStart < 0 && <Badge info>Starts in {pluralize(-fromStart, "minute")}</Badge>}
      </MeetingHeader>
      <MeetingTitle>
        {summary || "(No title)"} <Time timestamp={startTimestamp} /> - <Time timestamp={endTimestamp} />
      </MeetingTitle>
      <MeetingSubtitle>
        {organizer.displayName} {guestsCount > 0 && `and ${pluralize(guestsCount, "guest")}`}
      </MeetingSubtitle>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp,
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(CurrentMeeting);
