const reducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      return {
        darkMode: false,
      };
    case "DARK":
      return {
        darkMode: true,
      };
    case "TOGGLE":
      return {
        darkMode: !state.darkMode,
      };
    default:
      break;
  }
};

export default reducer;
