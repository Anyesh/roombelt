const router = require("express-promise-router")();

const deviceRepresentation = ({ deviceId, createdAt, updatedAt, calendarId }) => ({
  id: deviceId,
  createdAt,
  calendarId,
  isOnline: updatedAt > Date.now() - 70 * 1000,
  msSinceLastActivity: Date.now() - updatedAt
});

const calendarRepresentation = ({ id, location, summary, description, accessRole }) => ({
  id,
  location,
  summary,
  description,
  canModifyEvents: accessRole === "writer" || accessRole === "owner"
});

const userRepresentation = ({ displayName, image }) => ({ displayName, avatarUrl: image.url });

router.use("/admin", async function(req, res) {
  if (req.context.accessToken.scope !== "admin" || !req.context.accessToken.isVerified) {
    return res.sendStatus(403);
  }

  return "next";
});

router.get("/admin/user", async function(req, res) {
  const userDetails = await req.context.calendarProvider.getUserDetails();
  res.json(userRepresentation(userDetails));
});

router.get("/admin/calendar", async function(req, res) {
  const calendars = await req.context.calendarProvider.getCalendars();
  res.json(calendars.map(calendarRepresentation));
});

router.get("/admin/device", async function(req, res) {
  const devices = await req.context.storage.devices.getDevicesForUser(req.context.accessToken.userId);
  res.json(devices.map(deviceRepresentation));
});

router.post("/admin/device", async function(req, res) {
  const device = await req.context.storage.devices.getDeviceByConnectionCode(req.body.connectionCode);

  if (!device) {
    return res.sendStatus(404);
  }

  await Promise.all([
    req.context.storage.devices.connectDevice(device.deviceId, req.context.accessToken.userId),
    req.context.storage.login.verifyDeviceAccessToken(device.deviceId, req.context.accessToken.userId)
  ]);

  res.json(deviceRepresentation(device));
});

router.put("/admin/device/:deviceId", async function(req, res) {
  const device = await req.context.storage.devices.getDeviceById(req.params.deviceId);

  if (!device || device.userId !== req.context.accessToken.userId) {
    res.status(404).send(`No device with id ${req.params.deviceId}`);
  }

  if (req.body.calendarId) {
    const calendarsFromProvider = await req.context.calendarProvider.getCalendars();
    const calendar = calendarsFromProvider.find(calendar => calendar.id === req.body.calendarId);

    if (!calendar) {
      return res.status(404).send(`No calendar with id ${req.body.calendarId}`);
    }
  }

  await req.context.storage.devices.setCalendarForDevice(req.params.deviceId, req.body.calendarId);

  res.sendStatus(204);
});

router.delete("/admin/device/:deviceId", async function(req, res) {
  const device = await req.context.storage.devices.getDeviceById(req.params.deviceId);

  if (device && device.userId === req.context.accessToken.userId) {
    req.context.storage.devices.removeDevice(req.params.deviceId, req.context.accessToken.userId);
  }

  res.sendStatus(204);
});

module.exports = router;
