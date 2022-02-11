export default (state = { messages: [] }, action) => {
    switch (action.type) {
      case "GET_RESPONSE":
        console.log("Get response", action.payload);
        const stt = {
          ...state,
          messages: state.messages.concat(action.payload),
        };
        return stt;
      default:
        return state;
    }
  };
  