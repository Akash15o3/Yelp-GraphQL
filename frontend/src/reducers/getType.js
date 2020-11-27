const getType = (state = "Customer", action) => {
  switch (action.type) {
    case "RestaurantType":
      return "Restaurant";
    case "CustomerType":
      return "Customer";
    default:
      return state;
  }
};

export default getType;
