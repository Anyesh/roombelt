const router = require("express-promise-router")();
const Sequelize = require("sequelize");
const Storage = require("./storage");
const GoogleCalendar = require("./services/google-calendar");
const config = require("./config");

const storage = new Storage(
  new Sequelize(config.databaseUrl, {
    logging: process.env.NODE_ENV !== "production",
    operatorsAliases: false
  })
);

router.use(async req => {
  const accessToken = await storage.login.getAccessTokenDetails(req.token);
  const calendarProvider = new GoogleCalendar(config, await storage.oauth.getTokens(accessToken.userId));

  req.context = { storage, calendarProvider, accessToken };

  return "next";
});

module.exports = router;
