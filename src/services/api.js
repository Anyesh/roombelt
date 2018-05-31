import axios from "axios";
import { getAccessToken } from "./access-token";

axios.interceptors.request.use(function(config) {
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${getAccessToken()}` } };
});

axios.interceptors.response.use(response => response.data, error => Promise.reject(error.response));

export function getAuth() {
  return axios.get("/api/auth");
}

export function createDevice() {
  return axios.post("/api/auth/device");
}

export function getUserDetails() {
  return axios.get('/api/admin/user')
}

export function getConnectedDevices() {
  return axios.get("/api/admin/device");
}

export function connectDevice(connectionCode) {
  return axios.post("/api/admin/device", { connectionCode });
}

export function disconnectDevice(deviceId) {
  return axios.delete(`/api/admin/device/${encodeURIComponent(deviceId)}`);
}

export function getCalendars() {
  return axios.get("/api/admin/calendar");
}

export function setCalendarForDevice(deviceId, calendarId) {
  return axios.put(`/api/admin/device/${encodeURIComponent(deviceId)}`, { calendarId });
}

export function heartbeatDevice() {
  return axios.put("/api/device/heartbeat");
}

export function getDeviceDetails() {
  return axios.get("/api/device");
}

export function createMeeting(timeInMinutes) {
  return axios.post("/api/device/meeting", { timeInMinutes });
}

export function updateMeeting(meetingId, { startNow, endNow, extensionTime, checkIn }) {
  return axios.put(`/api/device/meeting/${meetingId}`, { startNow, endNow, extensionTime, checkIn });
}

export function deleteMeeting(meetingId) {
  return axios.delete(`/api/device/meeting/${encodeURIComponent(meetingId)}`);
}
