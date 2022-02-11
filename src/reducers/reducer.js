const Reducer = (state = { }, action) => {
    switch (action.type) {
      case "SET_SAFEZONE":
        console.log("Set safezone", action.payload);
        const stt = {
          ...state,
          safezone: action.payload,
        };
        return stt;
      default:
        return state;
    }
  };
  export default Reducer;