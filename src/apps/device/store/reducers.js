import { combineReducers } from "redux";

const auth = (state = { connectionCode: null }, action) => {
  switch (action.type) {
    case ":device--set-connection-code":
      return { connectionCode: action.connectionCode };
    case ":device--initialize-after-authentication":
      return { showConnectScreen: false };
    default:
      return state;
  }
};

const timestamp = (state = 0, action) => (action.type === ":device--set-clock" ? action.timestamp : state);
const device = (state = null, action) => (action.type === ":device--set-data" ? action.device : state);

const defaultCurrentMeetingActionsState = {
  action: null,
  argument: null,
  isError: false,
  isRetrying: false
};

const currentMeetingActions = (state = defaultCurrentMeetingActionsState, action) => {
  switch (action.type) {
    case ":device--meeting-action--run":
      return { ...state, action: action.action, argument: action.argument, isRetrying: action.isRetrying };
    case ':device--meeting-action--reset':
      return defaultCurrentMeetingActionsState;
    case ":device--meeting-action--error":
      return { ...state, isError: true, isRetrying: false };
    default:
      return state;
  }
};

const appState = (state = { unexpectedError: false, isOffline: false }, action) => {
  switch (action.type) {
    case ":device--unexpected-error":
      return { ...state, unexpectedError: action.error };
    case ":device--update-offline-status":
      return { ...state, isOffline: action.isOffline };
    default:
      return state;
  }
};

const fullScreen = (state = { isFullScreen: null, isSupported: null }, action) => {
  switch (action.type) {
    case ":device--update-full-screen-state":
      return { isFullScreen: action.isFullScreen, isSupported: action.isSupported };
    default:
      return state;
  }
};

export default combineReducers({
  fullScreen,
  appState,
  timestamp,
  auth,
  device,
  currentMeetingActions
});
