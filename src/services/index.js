import { store } from "../reducers/store.js";
import * as api from "../api/index.js";

export const setSafeZone = async (req) => {
    let safeZone = req;

    let res = {}

    try {
      res = await api.setSafeZone(safeZone);
    } catch (err) {
      console.log(err);
    }

    store.dispatch({
      type: "SET_SAFEZONE",
      payload: safeZone,
    });
    return res;
  };

