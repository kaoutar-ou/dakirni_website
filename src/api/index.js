import axios from "./axios";

const safeZone = "setsafezone";

export const setSafeZone = (data) => axios.post(safeZone, data);
