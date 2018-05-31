const router = require("express-promise-router")();

router.use("/oauth/callback", async (req, res) => {
  if (req.query.error === "access_denied") {
    return res.redirect("/");
  }

  if (!req.query || !req.query.code) {
    return res.sendStatus(400);
  }

  const tokens = await req.context.calendarProvider.getAuthTokens(req.query.code).then(undefined, () => null);

  if (!tokens) {
    return res.sendStatus(401);
  }

  await req.context.storage.oauth.saveTokens(tokens);

  const savedTokens = await req.context.storage.oauth.getTokens(tokens.userId);

  if (!savedTokens.refreshToken) {
    return res.redirect(req.context.calendarProvider.getAuthUrl(true));
  }

  const accessToken = await req.context.storage.login.createAccessToken({
    userId: tokens.userId,
    scope: "admin",
    isVerified: true
  });

  res.cookie("accessToken", accessToken);
  res.redirect(`/admin`);
});

module.exports = router;
