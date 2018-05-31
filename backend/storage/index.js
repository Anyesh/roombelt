const Devices = require("./devices");
const Login = require("./login");
const OAuth = require("./oauth");

module.exports = class {
  constructor(sequelize) {
    this.login = new Login(sequelize);
    this.oauth = new OAuth(sequelize);
    this.devices = new Devices(sequelize);

    sequelize.sync().catch(error => {
      console.error(error.message);
      process.exit(1);
    });
  }
};
