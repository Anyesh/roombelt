const config = require("./config");

module.exports = function(req, res, next) {
  if (!config.forceHttps) {
    return next();
  }

  if (req.headers["x-forwarded-proto"] === "https") {
    next();
  } else {
    res.redirect("https://" + req.headers.host + req.url);
  }
};
