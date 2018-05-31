import { createMeeting, deleteMeeting, updateMeeting, getDeviceDetails } from "../../../../services/api";
import { currentMeetingSelector } from "../selectors";

export async function create(action, store) {
  if (action.type !== ":device--meeting-action--run" || action.action !== "ACTION_TYPE_CREATE") {
    return;
  }

  try {
    await createMeeting(action.minutes);
    await updateMeetingDone(store);
  } catch (error) {
    updateMeetingError(store, error);
  }
}

function getUpdateActionArgument(action) {
  if (action.action === "ACTION_TYPE_END") return { endNow: true };
  if (action.action === "ACTION_TYPE_CHECK_IN") return { checkIn: true };
  if (action.action === "ACTION_TYPE_EXTEND") return { extensionTime: action.argument };
  if (action.action === "ACTION_TYPE_START_EARLY") return { checkIn: true, startNow: true };
}

export async function update(action, store) {
  const updateOptions = getUpdateActionArgument(action);

  if (action.type !== ":device--meeting-action--run" || !updateOptions) {
    return;
  }

  const currentMeetingId = currentMeetingSelector(store.getState()).id;

  try {
    await updateMeeting(currentMeetingId, updateOptions);
    await updateMeetingDone(store);
  } catch (error) {
    updateMeetingError(store, error);
  }
}

export async function cancel(action, store) {
  if (action.type !== ":device--meeting-action--run" || action.action !== "ACTION_TYPE_CANCEL") {
    return;
  }

  const currentMeetingId = currentMeetingSelector(store.getState()).id;

  try {
    await deleteMeeting(currentMeetingId);
    await updateMeetingDone(store);
  } catch (error) {
    updateMeetingError(store, error);
  }
}

async function updateMeetingDone(store) {
  store.dispatch({ type: ":device--set-data", device: await getDeviceDetails() });
  store.dispatch({ type: ':device--meeting-action--reset' });
}

function updateMeetingError(store, error) {
  console.error(error);
  store.dispatch({ type: ":device--meeting-action--error" });
}
