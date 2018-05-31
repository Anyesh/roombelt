import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { currentMeetingSelector, nextMeetingSelector, minutesToNextMeetingSelector } from "../../store/selectors";

import ActionError from "./ActionError";
import RoomAvailable from "./RoomAvailable";
import MeetingNeedsCheckIn from "./MeetingNeedsCheckIn";
import MeetingCheckedIn from "./MeetingCheckedIn";
import EndMeeting from "./EndMeeting";

export const Wrapper = styled.div`
  margin: 1rem 0;
  height: 3rem;
`;

class Actions extends React.PureComponent {
  state = { idOfMeetingToEnd: null };

  render() {
    if (this.props.isActionError) return <Wrapper children={this.renderError()} />;
    if (this.props.currentMeeting) return <Wrapper children={this.renderCurrentMeetingActions()} />;
    else return <Wrapper children={this.renderRoomAvailableActions()} />;
  }

  renderRoomAvailableActions() {
    return (
      <RoomAvailable
        minutesToNextMeeting={this.props.minutesToNextMeeting}
        createMeeting={this.props.createMeeting}
        showLoaderFor={this.props.actionArgument}
      />
    );
  }

  renderCurrentMeetingActions() {
    if (this.props.currentMeeting.id === this.state.idOfMeetingToEnd) {
      return (
        <EndMeeting
          inProgress={this.props.isActionInProgress}
          onCancel={() => this.setState({ idOfMeetingToEnd: null })}
          onSubmit={this.props.currentMeeting.isCheckedIn ? this.props.endMeeting : this.props.cancelMeeting}
        />
      );
    }

    if (!this.props.currentMeeting.isCheckedIn) {
      const hasStarted = this.props.currentTimestamp >= this.props.currentMeeting.startTimestamp;

      return (
        <MeetingNeedsCheckIn
          hasStarted={hasStarted}
          checkInToMeeting={hasStarted ? this.props.checkInToMeeting : this.props.startMeetingEarly}
          cancelMeeting={() => this.setState({ idOfMeetingToEnd: this.props.currentMeeting.id })}
          inProgress={this.props.isActionInProgress}
        />
      );
    }

    return (
      <MeetingCheckedIn
        minutesToNextMeeting={this.props.minutesToNextMeeting}
        extendMeeting={this.props.extendMeeting}
        showLoaderFor={this.props.actionArgument}
        endMeeting={() => this.setState({ idOfMeetingToEnd: this.props.currentMeeting.id })}
      />
    );
  }

  renderError() {
    return (
      <ActionError
        onRetry={() => this.props.retryAction(this.props.currentAction, this.props.actionArgument)}
        isRetrying={this.props.isActionRetrying}
        onCancel={this.props.cancelAction}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp,
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state),
  minutesToNextMeeting: minutesToNextMeetingSelector(state),

  isActionInProgress: state.currentMeetingActions.action !== null,
  currentAction: state.currentMeetingActions.action,
  actionArgument: state.currentMeetingActions.argument,
  isActionError: state.currentMeetingActions.isError,
  isActionRetrying: state.currentMeetingActions.isRetrying
});

const mapDispatchToProps = dispatch => ({
  createMeeting: (minutes, isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_CREATE", argument: minutes, isRetrying });
  },
  extendMeeting: (minutes, isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_EXTEND", argument: minutes, isRetrying });
  },
  endMeeting: (isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_END", isRetrying });
  },
  cancelMeeting: (isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_CANCEL", isRetrying });
  },
  checkInToMeeting: (isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_CHECK_IN", isRetrying });
  },
  startMeetingEarly: (isRetrying = false) => {
    dispatch({ type: ":device--meeting-action--run", action: "ACTION_TYPE_START_EARLY", isRetrying });
  },
  retryAction: (action, argument) => {
    dispatch({ type: ":device--meeting-action--run", action, argument, isRetrying: true });
  },
  cancelAction: () => dispatch({ type: ':device--meeting-action--reset' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
