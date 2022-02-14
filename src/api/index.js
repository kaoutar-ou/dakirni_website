import axios from "./axios";

const setSafeZoneUrl = "safezone/setsafezone";
const getSafeZoneUrl = "safezone/getsafezone";

export const setSafeZone = (data) => axios.post(setSafeZoneUrl, data);
export const getSafeZone = (fatherKey) => axios.get(getSafeZoneUrl, fatherKey);

