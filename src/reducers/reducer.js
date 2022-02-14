const Reducer = (state = { }, action) => {
    switch (action.type) {
      case "SET_SAFEZONE":
        console.log("Set safezone", action.payload);
        const stt = {
          ...state,
          safezone: action.payload,
        };
        return stt;
      case "SET_FATHERKEY":
        console.log("Set father key", action.payload);
        const stat = {
          ...state,
          fatherKey: action.payload,
        };
        return stat;
      default:
        return state;
    }
  };
  export default Reducer;