require("dotenv").config();

const path = require("path");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(require("./force-ssl"));
app.use("/api", bearerToken());
app.use("/api", bodyParser.json());
app.use("/api", require("./context"));
app.use("/api", require("./api"));

app.use(express.static(path.join(__dirname, "../", "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`> Ready on http://localhost:${port}`);
});
