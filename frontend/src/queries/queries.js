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
    }
  }
`;

export { getCustomerQuery };
