import { store } from "../reducers/store.js";
import { getRes } from "../api/index.js";

const getResponse = async (query) => {
    var message = {
     
    };

    const request = {
      data: {
        sessionId: "123456789",
        languageCode: "en",
        query: query,
      },
    };
    try {
      const res = await getRes(request);
     
    } catch (err) {
      console.log(err);
    }

    store.dispatch({
      type: "GET_RESPONSE",
      payload: message,
    });
    return message;
  };