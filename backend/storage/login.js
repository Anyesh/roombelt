const Sequelize = require("sequelize");

module.exports = class {
  constructor(sequelize) {
    this.Model = sequelize.define("login", {
      token: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      scope: { type: Sequelize.STRING, defaultValue: "none" },
      userId: Sequelize.STRING,
      deviceId: Sequelize.STRING,
      isVerified: Sequelize.BOOLEAN
    });
  }

  async createAccessToken({ scope, userId, deviceId, isVerified } = {}) {
    const model = this.Model.build({ scope, userId, deviceId, isVerified });
    await model.save();

    return model.token;
  }

  async getAccessTokenDetails(token) {
    const model = token && token !== "null" && (await this.Model.findOne({ where: { token } }));
    return model || { scope: "none", isVerified: false };
  }

  async verifyDeviceAccessToken(deviceId, userId) {
    await this.Model.update({ isVerified: true, userId }, { where: { deviceId } });
  }
};
