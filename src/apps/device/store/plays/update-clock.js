export default async function(action, store) {
  if (action.type !== ":device--initialize-clock") {
    return;
  }

  while (true) {
    store.dispatch({ type: ":device--set-clock", timestamp: Date.now() });
    await new Promise(res => setTimeout(res, 10 * 1000));
  }
}
