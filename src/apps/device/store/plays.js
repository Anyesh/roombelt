export { default as authenticate } from "./plays/authenticate";
export { default as updateClock } from "./plays/update-clock";
export { default as updateCalendar } from "./plays/update-calendar";
export { default as heartbeat } from "./plays/heartbeat";

export const meeting = require('./plays/meeting-plays');
export const fullscreen = require('./plays/fullscreen');

export async function logger(action) {
  console.info("%c[action] %s", "color: #777", action.type);
}
