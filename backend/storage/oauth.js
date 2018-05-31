const Sequelize = require("sequelize");

module.exports = class {
  constructor(sequelize) {
    this.Model = this.Model = sequelize.define("oauth", {
      userId: { type: Sequelize.STRING, primaryKey: true },
      accessToken: Sequelize.STRING,
      refreshToken: Sequelize.STRING
    });
  }

  async saveTokens({ userId, accessToken, refreshToken }) {
    const fieldsToUpdate = refreshToken ? ["accessToken", "refreshToken"] : ["accessToken"];
    await this.Model.upsert({ userId, accessToken, refreshToken }, { fields: fieldsToUpdate });
  }

  async getTokens(userId) {
    return await this.Model.findById(userId);
  }
};
