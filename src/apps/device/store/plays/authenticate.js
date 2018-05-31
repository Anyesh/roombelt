import { createDevice, getAuth } from "../../../../services/api";
import { setAccessToken } from "../../../../services/access-token";

export default async function(action, store) {
  if (action.type !== ":device--authenticate") {
    return;
  }

  async function isAuthenticated() {
    try {
      const auth = await getAuth();
      return auth.scope === "device" && auth.isVerified;
    } catch (error) {
      return false;
    }
  }

  if (!await isAuthenticated()) {
    const { accessToken, connectionCode } = await createDevice();

    setAccessToken(accessToken);
    store.dispatch({ type: ":device--set-connection-code", connectionCode });

    do {
      await new Promise(res => setTimeout(res, 5000));
    } while (!await isAuthenticated());
  }

  store.dispatch({ type: ":device--initialize-after-authentication" });
}
