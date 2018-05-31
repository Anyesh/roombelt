import { createSelector } from "reselect";
import { timeDifferenceInMinutes } from "../../../services/formatting";

const timestampSelector = state => state.timestamp;
const deviceSelector = state => state.device;
const actionsSelector = state => state.currentMeetingActions;

export const connectionCodeSelector = state => state.auth.connectionCode;

export const isDeviceConnectedSelector = createSelector(deviceSelector, device => !!device);
export const isCalendarSelectedSelector = createSelector(deviceSelector, device => device && device.isCalendarSelected);

export const deviceNameSelector = createSelector(deviceSelector, device => device && device.name);

export const currentMeetingSelector = createSelector(deviceSelector, device => {
  return device.events.find(
    event => event.startTimestamp < Date.now() + 5 * 60 * 1000 && event.endTimestamp > Date.now()
  );
});

export const nextMeetingSelector = createSelector([deviceSelector, currentMeetingSelector], (device, currentMeeting) =>
  device.events.find(event => {
    const isToday = new Date(event.startTimestamp).toDateString() === new Date().toDateString();
    const isLater = event.startTimestamp > Date.now();
    const isNotCurrentMeeting = !currentMeeting || event.id !== currentMeeting.id;
    return isToday && isLater && isNotCurrentMeeting;
  })
);

export const minutesToNextMeetingSelector = createSelector(
  [timestampSelector, currentMeetingSelector, nextMeetingSelector],
  (currentTimestamp, currentMeeting, nextMeeting) => {
    return timeDifferenceInMinutes(
      nextMeeting && nextMeeting.startTimestamp,
      currentMeeting ? currentMeeting.endTimestamp : currentTimestamp
    );
  }
);

export const isCreatingMeeting = createSelector(actionsSelector, actions => actions.action === "ACTION_TYPE_CREATE");
export const creatingMeetingTime = createSelector(actionsSelector, actions => actions.argument);

export const getIsOffline = state => state.appState.isOffline;
