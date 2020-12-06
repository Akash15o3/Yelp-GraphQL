import { gql } from "apollo-boost";

const getCustomerQuery = gql`
  query($email: String) {
    customer(email: $email) {
      customerID
      fname
      lname
      email
      pass
      dateofbirth
      city
      State
      country
      phonenumber
      nickname
      yelpingsince
      thingsilove
      about
      findmein
      myblog
      prof_pic
    }
  }
`;

const getRestaurantQuery = gql`
  query($email: String) {
    restaurant(email: $email) {
      restaurantID
      pass
      contact
      timing
      prof_pic
      dish_pic
      name
      location
      description
      email
      website
      reviews
    }
  }
`;

const getDishQuery = gql`
  query($email: String) {
    dishquery(email: $email) {
      restaurantemail
      dish_title
      dish_cat
      dish_price
      dish_des
      dish_ing
    }
  }
`;

const getRestaurantOrder = gql`
  query($restaurantEmailForOrder: String) {
    restaurantOrder(restaurantEmailForOrder: $restaurantEmailForOrder) {
      _id
      customerEmailForOrder
      restaurantEmailForOrder
      customerNameForOrder
      restaurantNameForOrder
      dishOrder
      status
      deliveryType
      pickupStatus
      deliveryStatus
      timeOfOrder
      timestamp
    }
  }
`;

const getRestaurantOrderByStatus = gql`
  query($restaurantEmailForOrder: String, $status: String) {
    restaurantOrderByStatus(
      restaurantEmailForOrder: $restaurantEmailForOrder
      status: $status
    ) {
      _id
      customerEmailForOrder
      restaurantEmailForOrder
      customerNameForOrder
      restaurantNameForOrder
      dishOrder
      status
      deliveryType
      pickupStatus
      deliveryStatus
      timeOfOrder
      timestamp
    }
  }
`;

const getCustomerOrderByStatus = gql`
  query($customerEmailForOrder: String, $status: String) {
    customerOrderByStatus(
      customerEmailForOrder: $customerEmailForOrder
      status: $status
    ) {
      _id
      customerEmailForOrder
      restaurantEmailForOrder
      customerNameForOrder
      restaurantNameForOrder
      dishOrder
      status
      deliveryType
      pickupStatus
      deliveryStatus
      timeOfOrder
      timestamp
    }
  }
`;

const getCustomerOrder = gql`
  query($customerEmailForOrder: String) {
    customerOrder(customerEmailForOrder: $customerEmailForOrder) {
      customerEmailForOrder
      restaurantEmailForOrder
      customerNameForOrder
      restaurantNameForOrder
      dishOrder
      status
      deliveryType
      pickupStatus
      deliveryStatus
      timeOfOrder
      timestamp
    }
  }
`;

const getCustomerOrderDesc = gql`
  query($customerEmailForOrder: String) {
    getCustomerOrderDesc(customerEmailForOrder: $customerEmailForOrder) {
      customerEmailForOrder
      restaurantEmailForOrder
      customerNameForOrder
      restaurantNameForOrder
      dishOrder
      status
      deliveryType
      pickupStatus
      deliveryStatus
      timeOfOrder
      timestamp
    }
  }
`;

const getAllRestaurantQuery = gql`
  query($location: String) {
    getAllRestaurantQuery(location: $location) {
      _id
      restaurantID
      pass
      contact
      timing
      prof_pic
      dish_pic
      name
      location
      description
      email
      website
      reviews
      prof_pic
    }
  }
`;
const getRestByLocation = gql`
  query($location: String) {
    allRestaurantByLocation(location: $location) {
      _id
      restaurantID
      pass
      contact
      timing
      prof_pic
      dish_pic
      name
      location
      description
      email
      website
      reviews
    }
  }
`;
export {
  getCustomerQuery,
  getAllRestaurantQuery,
  getRestByLocation,
  getRestaurantQuery,
  getRestaurantOrder,
  getDishQuery,
  getCustomerOrder,
  getRestaurantOrderByStatus,
  getCustomerOrderByStatus,
  getCustomerOrderDesc,
};
