import { gql } from "apollo-boost";

const addCustomerMutation = gql`
  mutation AddCustomer(
    $fname: String
    $lname: String
    $customerID: String
    $email: String
    $pass: String
  ) {
    addCustomer(
      fname: $fname
      lname: $lname
      customerID: $customerID
      email: $email
      pass: $pass
    ) {
      message
      status
    }
  }
`;

const loginMutation = gql`
  mutation login($email: String, $pass: String) {
    login(email: $email, pass: $pass) {
      message
      status
    }
  }
`;

const addRestaurantMutation = gql`
  mutation addRestaurant(
    $name: String
    $location: String
    $email: String
    $pass: String
    $restaurantID: String
  ) {
    addRestaurant(
      name: $name
      location: $location
      email: $email
      pass: $pass
      restaurantID: $restaurantID
    ) {
      message
      status
    }
  }
`;

const restLoginMutation = gql`
  mutation restLogin($email: String, $pass: String) {
    restLogin(email: $email, pass: $pass) {
      message
      status
    }
  }
`;

export {
  addCustomerMutation,
  addRestaurantMutation,
  restLoginMutation,
  loginMutation,
};
