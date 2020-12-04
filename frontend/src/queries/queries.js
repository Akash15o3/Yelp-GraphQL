import { gql } from "apollo-boost";

const getCustomerQuery = gql`
  query($_id: ID) {
    customer(_id: $_id) {
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
  query($_id: ID) {
    restaurant(_id: $_id) {
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

const getAllRestaurantQuery = gql`
  query($name: String) {
    allRestaurant(name: $name) {
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
};
