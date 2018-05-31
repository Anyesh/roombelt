const path = require("path");
const chalk = require("chalk");

require("dotenv").config({ path: path.resolve(process.cwd(), "roombelt.env") });

const result = {
  clientId: process.env["GOOGLE_CLIENT_ID"],
  clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
  redirectUrl: process.env["GOOGLE_REDIRECT_URL"],
  databaseUrl: process.env["DATABASE_URL"],
  forceHttps: process.env["FORCE_HTTPS"] === "true" || process.env["FORCE_HTTPS"] === "1"
};

if (!result.clientId || !result.clientSecret || !result.redirectUrl) {
  console.log(chalk.red("Error: Authentication credentials for Google API have not been provided."));
  console.log(chalk.red("Take a look at https://docs.roombelt.com/installing-locally for instructions."));
  process.exit(1);
}

if (!result.databaseUrl) {
  console.log(chalk.red("Error: Database connection string has not been provided."));
  console.log(chalk.red("Take a look at https://docs.roombelt.com/installing-locally for instructions."));
  process.exit(1);
}

module.exports = result;
