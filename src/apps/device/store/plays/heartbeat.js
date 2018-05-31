import { heartbeatDevice } from "../../../../services/api";

function sleep(seconds) {
  return new Promise(res => setTimeout(res, seconds * 1000));
}

async function heartbeat(action, store) {
  if (action.type !== ":device--initialize-heartbeat") {
    return;
  }

  const actionErrorWatcher = store.watch(action => action.type === ":device--meeting-action--error");

  while (true) {
    const { isOffline, sleepTime } = await heartbeatDevice().then(
      () => ({ isOffline: false, sleepTime: 30 }),
      error => ({ isOffline: error === undefined, sleepTime: 5 })
    );

    store.dispatch({ type: ":device--update-offline-status", isOffline });

    if (isOffline) {
      store.dispatch({ type: ':device--meeting-action--reset' });
    }

    await Promise.race([sleep(sleepTime), actionErrorWatcher.getNextAsync()]);
  }
}

export default heartbeat;
