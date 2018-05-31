import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deviceNameSelector, currentMeetingSelector, nextMeetingSelector } from "../store/selectors";

import { Time, PageLoaded } from "../../../theme";
import NextMeeting from "./NextMeeting";
import CurrentMeeting from "./CurrentMeeting";
import RoomAvailable from "./RoomAvailable";
import FullScreenToggle from "./FullScreenToggle";
import ActionsBar from "./actions-bar";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  background: #f5f7fb;
  font-family: "Roboto", sans-serif;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "calendar-name current-time"
    "main-content main-content"
    "next-meeting next-meeting";

  --font-size: 6px;

  @media (min-width: 300px) {
    --font-size: 10px;
  }

  @media (min-width: 500px) {
    --font-size: 16px;
  }

  @media (min-width: 700px) {
    --font-size: 20px;
  }

  @media (min-width: 900px) {
    --font-size: 24px;
  }

  @media (min-width: 1100px) {
    --font-size: 30px;
  }

  @media (min-width: 1300px) {
    --font-size: 35px;
  }

  @media (min-width: 1500px) {
    --font-size: 40px;
  }

  @media (min-width: 1700px) {
    --font-size: 46px;
  }
`;

const CalendarName = styled.div`
  grid-area: calendar-name;
  color: var(--text);
  font-size: calc(var(--font-size) * 1.5);
  background: white;
  padding: calc(var(--font-size) * 0.5);
`;

const CurrentTime = styled.div`
  grid-area: current-time;
  color: var(--text);
  font-size: calc(var(--font-size) * 1.5);
  background: white;
  padding: calc(var(--font-size) * 0.5);
`;

const MainContent = styled.div`
  grid-area: main-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 0.1rem solid #ccc;
  padding: calc(var(--font-size) * 0.5);
`;

const Footer = styled.div`
  grid-area: next-meeting;
  padding: calc(var(--font-size) * 0.5);
`;

const CalendarView = props => (
  <Wrapper style={props.style}>
    <PageLoaded />
    <CalendarName available={!props.currentMeeting}>{props.calendarName}</CalendarName>
    <CurrentTime>
      <Time timestamp={props.currentTimestamp} blinking />
    </CurrentTime>
    <MainContent>
      {props.currentMeeting ? <CurrentMeeting /> : <RoomAvailable />}
      <ActionsBar />
    </MainContent>
    <Footer>{props.nextMeeting && <NextMeeting />}</Footer>
    <FullScreenToggle />
  </Wrapper>
);

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp,
  calendarName: deviceNameSelector(state),
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(CalendarView);
