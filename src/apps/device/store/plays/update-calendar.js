import { getDeviceDetails } from "../../../../services/api";
import { isCalendarSelectedSelector } from "../selectors";

export default async function(action, store) {
  if (action.type !== ":device--initialize-after-authentication") {
    return;
  }

  while (true) {
    try {
      const device = await getDeviceDetails(action.accessToken);
      store.dispatch({ type: ":device--set-data", device });
    } catch (e) {
      if (e && e.status) {
        store.dispatch({ type: ":device--unexpected-error", error: new Error(`${e.status}: ${e.statusText}`) });
      }
    }

    const timeout = isCalendarSelectedSelector(store.getState()) ? 30 : 5;
    await new Promise(res => setTimeout(res, timeout * 1000));
  }
}
