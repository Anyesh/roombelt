const Sequelize = require("sequelize");

module.exports = class {
  constructor(sequelize) {
    this.Model = sequelize.define("devices", {
      deviceId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      connectionCode: { type: Sequelize.STRING, defaultValue: () => Math.floor(Math.random() * 100000).toString() },
      userId: Sequelize.STRING,
      calendarId: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  }

  async createDevice() {
    const model = this.Model.build({});
    await model.save();
    return model;
  }

  async removeDevice(deviceId) {
    await this.Model.destroy({ where: { deviceId } });
  }

  async getDeviceById(deviceId) {
    return await this.Model.findById(deviceId);
  }

  async getDeviceByConnectionCode(connectionCode) {
    return await this.Model.findOne({ where: { connectionCode } });
  }

  async getDevicesForUser(userId) {
    return await this.Model.findAll({ where: { userId } });
  }

  async connectDevice(deviceId, userId) {
    await this.Model.update({ userId, connectionCode: null }, { where: { deviceId } });
  }

  async heartbeatDevice(deviceId) {
    await this.Model.update({}, { where: { deviceId } });
  }

  async setCalendarForDevice(deviceId, calendarId) {
    await this.Model.update({ calendarId }, { where: { deviceId } });
  }
};
