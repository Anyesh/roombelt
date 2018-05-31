export const getAccessToken = () => window.localStorage.getItem("roombelt-access-token");
export const setAccessToken = value => window.localStorage.setItem("roombelt-access-token", value);
