import {
  connectDevice,
  getCalendars,
  getConnectedDevices,
  getUserDetails,
  disconnectDevice,
  setCalendarForDevice
} from "../../../services/api";

const logger = action => {
  console.info("%c[action] %s", "color: #777", action.type);
};

const initialFetch = async (action, store) => {
  if (action.type !== ":initial-data--fetch") {
    return;
  }

  const [calendars, devices, user] = await Promise.all([getCalendars(), getConnectedDevices(), getUserDetails()]);

  store.dispatch({ type: ":calendars--set", calendars });
  store.dispatch({ type: ":devices--set", devices });
  store.dispatch({ type: ":user-details--set", user });
};

const connectDeviceWizardSubmitStep1 = async (action, store) => {
  if (action.type !== ":connect-device-wizard--submit-step-1") {
    return;
  }

  try {
    const connectionCode = store.getState().connectDeviceWizard.connectionCode;
    const device = await connectDevice(connectionCode);

    store.dispatch({ type: ":connect-device-wizard--set-current-step", currentStep: 1 });
    store.dispatch({ type: ":connect-device-wizard--set-device", deviceId: device.id });
  } catch (error) {
    if (error.status === 404) {
      store.dispatch({ type: ":connect-device-wizard--set-error-message", errorMessage: "Invalid connection code" });
    }
  }
};

const connectDeviceWizardSubmitStep2 = async (action, store) => {
  if (action.type !== ":connect-device-wizard--submit-step-2") {
    return;
  }

  const { deviceId, calendarId } = store.getState().connectDeviceWizard;

  await setCalendarForDevice(deviceId, calendarId);
  store.dispatch({ type: ":devices--set", devices: await getConnectedDevices() });
  store.dispatch({ type: ":connect-device-wizard--hide" });
};

const submitEditDevice = async (action, store) => {
  if (action.type !== ":edit-device--submit") {
    return;
  }

  const device = store.getState().editedDevice.data;
  await setCalendarForDevice(device.id, device.calendarId);

  store.dispatch({ type: ":edit-device--done", device });
};

const submitDisconnectDevice = async (action, store) => {
  if (action.type !== ":remove-device--confirm") {
    return;
  }

  const device = store.getState().removedDevice;
  await disconnectDevice(device.id);

  store.dispatch({ type: ":remove-device--done", device });
};

export default {
  logger,
  initialFetch,
  connectDeviceWizardSubmitStep1,
  connectDeviceWizardSubmitStep2,
  submitEditDevice,
  submitDisconnectDevice
};
