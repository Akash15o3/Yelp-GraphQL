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

const restLoginMutation = gql`
  mutation restLogin($email: String, $pass: String) {
    restLogin(email: $email, pass: $pass) {
      message
      status
    }
  }
`;

const updateCustomerProfile = gql`
  mutation updateCustomerProfile(
    $_id: String
    $fname: String
    $lname: String
    $customerID: String
    $email: String
    $pass: String
    $dateofbirth: String
    $city: String
    $State: String
    $country: String
    $phonenumber: String
    $nickname: String
    $yelpingsince: String
    $thingsilove: String
    $about: String
    $findmein: String
    $myblog: String
  ) {
    updateCustomerProfile(
      _id: $_id
      fname: $fname
      lname: $lname
      customerID: $customerID
      email: $email
      pass: $pass
      dateofbirth: $dateofbirth
      city: $city
      State: $State
      country: $country
      phonenumber: $phonenumber
      nickname: $nickname
      yelpingsince: $yelpingsince
      thingsilove: $thingsilove
      about: $about
      findmein: $findmein
      myblog: $myblog
    ) {
      message
      status
    }
  }
`;

const updateRestaurantProfile = gql`
  mutation updateRestaurantProfile(
    $_id: String
    $restaurantID: String
    $name: String
    $email: String
    $location: String
    $description: String
    $contact: String
    $timing: String
    $reviews: String
    $website: String
  ) {
    updateRestaurantProfile(
      _id: $_id
      name: $name
      restaurantID: $restaurantID
      location: $location
      email: $email

      description: $description
      contact: $contact
      timing: $timing
      reviews: $reviews
      website: $website
    ) {
      message
      status
    }
  }
`;

const updateOrderStatus = gql`
  mutation updateOrderStatus($_id: String, $status: String) {
    updateOrderStatus(_id: $_id, status: $status) {
      message
      status
    }
  }
`;

const addReview = gql`
  mutation addReview($email: String, $reviews: String) {
    addReview(email: $email, reviews: $reviews) {
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

const addDishMutation = gql`
  mutation adddish(
    $restaurantemail: String
    $dish_title: String
    $dish_cat: String
    $dish_price: String
    $dish_des: String
    $dish_ing: String
  ) {
    adddish(
      restaurantemail: $restaurantemail
      dish_title: $dish_title
      dish_cat: $dish_cat
      dish_price: $dish_price
      dish_des: $dish_des
      dish_ing: $dish_ing
    ) {
      message
      status
    }
  }
`;

const addOrderMutation = gql`
  mutation addOrder(
    $customerEmailForOrder: String
    $restaurantEmailForOrder: String
    $customerNameForOrder: String
    $restaurantNameForOrder: String
    $dishOrder: String
    $status: String
    $deliveryType: String
    $pickupStatus: String
    $deliveryStatus: String
    $timeOfOrder: String
  ) {
    addOrder(
      customerEmailForOrder: $customerEmailForOrder
      restaurantEmailForOrder: $restaurantEmailForOrder
      customerNameForOrder: $customerNameForOrder
      restaurantNameForOrder: $restaurantNameForOrder
      dishOrder: $dishOrder
      status: $status
      deliveryType: $deliveryType
      pickupStatus: $pickupStatus
      deliveryStatus: $deliveryStatus
      timeOfOrder: $timeOfOrder
    ) {
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
  updateCustomerProfile,
  updateRestaurantProfile,
  addDishMutation,
  addOrderMutation,
  updateOrderStatus,
  addReview,
};
