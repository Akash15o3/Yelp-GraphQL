const getusernamecust = (state = " ", action) => {
  console.log(action);
  switch (action.type) {
    case " getusernamecust ":
      return action.newState;
    default:
      return state;
  }
};

export default getusernamecust;
