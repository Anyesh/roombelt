const router = require("express-promise-router")();

router.use("/device", async function(req, res) {
  if (req.context.accessToken.scope !== "device" || !req.context.accessToken.isVerified) {
    return res.sendStatus(403);
  }

  req.context.device = await req.context.storage.devices.getDeviceById(req.context.accessToken.deviceId);

  return "next";
});

router.get("/device", async function(req, res) {
  const calendarId = req.context.device && req.context.device.calendarId;

  if (!calendarId) {
    return res.json({ isCalendarSelected: false });
  }

  const calendar = await req.context.calendarProvider.getCalendar(calendarId);
  const calendarEvents = await req.context.calendarProvider.getEvents(calendarId);

  const events = calendarEvents.filter(event => event.endTimestamp > Date.now()).slice(0, 3);

  res.json({
    isCalendarSelected: true,
    name: calendar.summary,
    canModifyEvents: calendar.accessRole === "writer" || calendar.accessRole === "owner",
    events
  });
});

router.put("/device/heartbeat", async function(req, res) {
  await req.context.storage.devices.heartbeatDevice(req.context.accessToken.deviceId);
  res.sendStatus(204);
});

router.use("/device/meeting", (req, res, next) => (req.context.device.calendarId ? next() : res.sendStatus(400)));

router.post("/device/meeting", async function(req, res) {
  const calendar = await req.context.calendarProvider.getCalendar(req.context.device.calendarId);
  const events = await req.context.calendarProvider.getEvents(req.context.device.calendarId);
  const nextEvent = events.find(event => event.startTimestamp > Date.now());

  const desiredStartTime = Date.now() + (req.body.timeInMinutes || 15) * 60 * 1000;
  const nextEventStartTime = nextEvent ? nextEvent.startTimestamp : Number.POSITIVE_INFINITY;

  await req.context.calendarProvider.createEvent(req.context.device.calendarId, {
    startTimestamp: Date.now(),
    endTimestamp: Math.min(desiredStartTime, nextEventStartTime),
    isCheckedIn: true,
    summary: `Meeting in ${calendar.summary}`
  });

  res.sendStatus(201);
});

router.put("/device/meeting/:meetingId", async function(req, res) {
  const events = await req.context.calendarProvider.getEvents(req.context.device.calendarId);
  const event = events.find(event => event.id === req.params.meetingId);

  if (event === -1) {
    return res.sendStatus(404);
  }

  const startNowTime = req.body.startNow && Date.now();
  const endNowTime = req.body.endNow && Date.now();
  const isCheckedIn = req.body.checkIn === true;
  const extensionTime = getExtensionTime();

  await req.context.calendarProvider.patchEvent(req.context.device.calendarId, req.params.meetingId, {
    startTimestamp: startNowTime,
    endTimestamp: endNowTime || extensionTime,
    isCheckedIn
  });

  res.sendStatus(204);

  function getExtensionTime() {
    if (!req.body.extensionTime) return;

    const indexOfEvent = events.indexOf(event);

    const currentEventEndTimestamp = events[indexOfEvent].endTimestamp;
    const nextEventStartTimestamp = events[indexOfEvent + 1] && events[indexOfEvent + 1].startTimestamp;

    const endTime = Math.min(
      currentEventEndTimestamp + req.body.extensionTime * 60 * 1000,
      nextEventStartTimestamp || Number.POSITIVE_INFINITY
    );

    return Math.max(event.endTimestamp, endTime);
  }
});

router.delete("/device/meeting/:meetingId", async function(req, res) {
  await req.context.calendarProvider.deleteEvent(req.context.device.calendarId, req.params.meetingId);

  res.sendStatus(204);
});

router.use("/device", (err, req, res, next) => {
  // As documented on https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 403 && err.message === "Forbidden") {
    res.statusMessage = 'CALENDAR_NO_WRITE_ACCESS';
    return res.sendStatus(403);
  }

  next(err);
});

module.exports = router;
