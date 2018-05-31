import screenfull from "screenfull";

export async function initialize(action, store) {
  if (action.type !== ":device--initialize-full-screen-state") return;

  if (!screenfull.enabled) {
    store.dispatch({ type: ":device--update-full-screen-state", isSupported: false, isFullScreen: false });
    return;
  }

  while (true) {
    store.dispatch({
      type: ":device--update-full-screen-state",
      isSupported: screenfull.enabled,
      isFullScreen: screenfull.isFullscreen
    });

    await new Promise(res => screenfull.onchange(res));
  }
}

initialize.hotReload = false;

export async function request(action) {
  if (action.type !== ":device--request-full-screen") return;

  if (screenfull.enabled) {
    screenfull.request();
  }
}
