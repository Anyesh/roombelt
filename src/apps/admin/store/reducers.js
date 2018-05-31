import { combineReducers } from "redux";

const user = (state = { displayName: "", avatarUrl: undefined }, action) => {
  if (action.type === ":user-details--set") {
    return { displayName: action.user.displayName, avatarUrl: action.user.avatarUrl };
  }

  return state;
};

const devices = (state = { isLoaded: false, data: [] }, action) => {
  switch (action.type) {
    case ":devices--set":
      return { isLoaded: true, data: action.devices };
    case ":edit-device--done":
      return { ...state, data: state.data.map(device => (device.id === action.device.id ? action.device : device)) };
    case ":remove-device--done":
      return { ...state, data: state.data.filter(device => device.id !== action.device.id) };
    default:
      return state;
  }
};
const calendars = (state = {}, action) => {
  switch (action.type) {
    case ":calendars--set":
      return action.calendars.reduce((acc, calendar) => ({ ...acc, [calendar.id]: calendar }), {});
    default:
      return state;
  }
};

const editedDevice = (state = { data: null, isSaving: false }, action) => {
  switch (action.type) {
    case ":start-edit-device":
      return { data: JSON.parse(JSON.stringify(action.device)), isSaving: false };
    case ":edit-device--submit":
      return { data: state.data, isSaving: true };
    case ":edit-device--done":
      return { data: null };
    case ":edit-device--cancel":
      return { data: null };
    case ":edit-device--set-calendar":
      return { data: { ...state.data, calendarId: action.calendarId } };
    default:
      return state;
  }
};

const removedDevice = (state = null, action) => {
  switch (action.type) {
    case ":start-remove-device":
      return action.device;
    case ":remove-device--cancel":
      return null;
    case ":remove-device--done":
      return null;
    default:
      return state;
  }
};

const defaultConnectDeviceWizardState = {
  currentStep: null,
  connectionCode: "",
  deviceId: null,
  calendarId: null,
  errorMessage: null,
  isSubmitting: false
};

const connectDeviceWizard = (state = defaultConnectDeviceWizardState, action) => {
  switch (action.type) {
    case ":connect-device-wizard--show":
      return { ...defaultConnectDeviceWizardState, currentStep: 0 };
    case ":connect-device-wizard--hide":
      return defaultConnectDeviceWizardState;
    case ":connect-device-wizard--set-code":
      return { ...state, connectionCode: action.connectionCode.replace(/\D/g, "") };
    case ":connect-device-wizard--submit-step-1":
      return { ...state, errorMessage: null, isSubmitting: true };
    case ":connect-device-wizard--submit-step-2":
      return { ...state, errorMessage: null, isSubmitting: true };
    case ":connect-device-wizard--set-error-message":
      return { ...state, errorMessage: action.errorMessage, isSubmitting: false };
    case ":connect-device-wizard--set-calendar":
      return { ...state, calendarId: action.calendarId };
    case ":connect-device-wizard--set-device":
      return { ...state, deviceId: action.deviceId };
    case ":connect-device-wizard--set-current-step":
      return { ...state, currentStep: action.currentStep, isSubmitting: false };
    default:
      return state;
  }
};

export default combineReducers({
  user,
  devices,
  calendars,
  editedDevice,
  removedDevice,
  connectDeviceWizard
});
