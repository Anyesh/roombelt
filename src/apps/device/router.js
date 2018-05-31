import React from "react";
import { connect } from "react-redux";
import { connectionCodeSelector, isDeviceConnectedSelector, isCalendarSelectedSelector } from "./store/selectors";


import Display from "./display";
import ConnectionCode from "./connect/ConnectionCode";
import NoCalendar from "./connect/NoCalendar";
import FatalError from "../../theme/layouts/FatalError";

const Router = props => {
  if (props.unexpectedError) return <FatalError title={props.unexpectedError.message} />;
  if (props.isOffline) return <FatalError title="No internet connection" />;
  if (props.connectionCode) return <ConnectionCode connectionCode={props.connectionCode} />;
  if (props.isCalendarSelected) return <Display />;
  if (props.isDeviceConnected) return <NoCalendar />;

  return null;
};

const mapStateToProps = state => ({
  unexpectedError: state.appState.unexpectedError,
  isOffline: state.appState.isOffline,
  connectionCode: connectionCodeSelector(state),
  isDeviceConnected: isDeviceConnectedSelector(state),
  isCalendarSelected: isCalendarSelectedSelector(state)
});

export default connect(mapStateToProps)(Router);
