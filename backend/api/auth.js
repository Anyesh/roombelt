const router = require("express-promise-router")();

router.get("/auth", (req, res) => {
  res.json({
    accessToken: req.context.accessToken.token,
    scope: req.context.accessToken.scope,
    isVerified: req.context.accessToken.isVerified,
    adminUrl: req.context.calendarProvider.getAuthUrl()
  });
});

router.post("/auth/device", async function(req, res) {
  const { deviceId, connectionCode } = await req.context.storage.devices.createDevice();

  const accessToken = await req.context.storage.login.createAccessToken({
    scope: "device",
    deviceId: deviceId,
    isVerified: false
  });

  return res.json({ accessToken, connectionCode });
});

module.exports = router;
