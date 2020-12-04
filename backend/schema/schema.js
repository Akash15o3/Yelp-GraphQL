const graphql = require("graphql");
const Cust_Profile = require("../Models/signupcustModel");
const Rest_Profile = require("../Models/signuprestModel");
const Dish = require("../Models/dishModel");
const Order = require("../Models/orderDishModel");
const { login } = require("../Mutations/login");
const { RestLogin } = require("../Mutations/loginRest");
const { custUpdate } = require("../Mutations/custUpdate");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    _id: { type: GraphQLID },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    pass: { type: GraphQLString },
    customerID: { type: GraphQLString },
    dateofbirth: { type: GraphQLString },
    city: { type: GraphQLString },
    State: { type: GraphQLString },
    country: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    nickname: { type: GraphQLString },
    yelpingsince: { type: GraphQLString },
    thingsilove: { type: GraphQLString },
    about: { type: GraphQLString },
    findmein: { type: GraphQLString },
    myblog: { type: GraphQLString },
    prof_pic: { type: GraphQLString },
  }),
});

const RestProfileModel = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    pass: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    restaurantID: { type: GraphQLString },
    contact: { type: GraphQLString },
    timing: { type: GraphQLString },
    reviews: { type: GraphQLString },
    dish_pic: { type: GraphQLString },
    prof_pic: { type: GraphQLString },
  }),
});

// const Dish = new GraphQLObjectType({
//   name: "Dish",
//   fields: () => ({
//     _id: { type: GraphQLID },
//     restaurantemail: { type: GraphQLString },
//     dish_title: { type: GraphQLString },
//     dish_cat: { type: GraphQLString },
//     dish_price: { type: GraphQLString },
//     dish_des: { type: GraphQLString },
//     dish_ing: { type: GraphQLString },
//   }),
// });

// const Order = new GraphQLObjectType({
//   name: "Order",
//   fields: () => ({
//     _id: { type: GraphQLID },
//     customerEmailForOrder: { type: GraphQLString },
//     restaurantEmailForOrder: { type: GraphQLString },
//     customerNameForOrder: { type: GraphQLString },
//     restaurantNameForOrder: { type: GraphQLString },
//     status: { type: GraphQLString },
//     deliveryType: { type: GraphQLString },
//     pickupStatus: { type: GraphQLString },
//     deliveryStatus: { type: GraphQLString },
//     timeOfOrder: { type: GraphQLString },
//     timestamp: { type: GraphQLString },
//     dishOrder: {
//       type: new GraphQLList(orderdish),
//       resolve(parent, args) {
//         return parent.dishOrder;
//       },
//     },
//   }),
// });

// const orderDish = new GraphQLObjectType({
//   name: "orderDish",
//   fields: () => ({
//     orderDish: { type: GraphQLString },
//   }),
// });

const StatusType = new GraphQLObjectType({
  name: "Status",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    customer: {
      type: CustomerType,
      args: { _id: { type: GraphQLID } },
      async resolve(parent, args) {
        let user = Cust_Profile.findById(args._id);
        if (user) {
          return user;
        }
      },
    },
    restaurant: {
      type: RestProfileModel,
      args: { _id: { type: GraphQLID } },
      async resolve(parent, args) {
        let user = await Rest_Profile.findById(args._id);
        if (user) {
          return user;
        }
      },
    },
    allRestaurant: {
      type: new GraphQLList(RestProfileModel),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurantList = await Rest_Profile.find({});
        return restaurantList;
      },
    },
    allRestaurantByLocation: {
      type: new GraphQLList(RestProfileModel),
      args: { location: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log(args);
        if (args.location === "") {
          let restaurantList = await Rest_Profile.find({});
          return restaurantList;
        } else {
          let restaurantList = await Rest_Profile.find({
            location: args.location,
          });
          return restaurantList;
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addRestaurant: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
      },
      resolve(parent, args) {
        //console.log("Stud Signup" + args);
        var newuser = new Rest_Profile({
          name: args.name,
          pass: args.pass,
          email: args.email,
          location: args.location,
          restaurantID: args.restaurantID,
        });
        newuser.save((error, data) => {
          if (data) {
            return { status: 200, message: "USER_ADDED" };
          } else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          }
        });
      },
    },
    addCustomer: {
      type: StatusType,
      args: {
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        customerID: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("Stud Signup" + args.fname);
        var newuser = new Cust_Profile({
          fname: args.fname,
          lname: args.lname,
          pass: args.pass,
          email: args.email,
          customerID: args.customerID,
        });
        newuser.save((error, data) => {
          if (data) {
            return { status: 200, message: "USER_ADDED" };
          } else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          }
        });
      },
    },
    login: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
      },
      resolve(parent, args) {
        return login(args);
      },
    },
    restLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
      },
      resolve(parent, args) {
        return RestLogin(args);
      },
    },

    updateCustomerProfile: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        customerID: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        dateofbirth: { type: GraphQLString },
        city: { type: GraphQLString },
        State: { type: GraphQLString },
        country: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        yelpingsince: { type: GraphQLString },
        thingsilove: { type: GraphQLString },
        about: { type: GraphQLString },
        findmein: { type: GraphQLString },
        myblog: { type: GraphQLString },
        nickname: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //console.log(args);
        return custUpdate(args);
      },
    },

    updateRestaurantProfile: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString },
        description: { type: GraphQLString },
        contact: { type: GraphQLString },
        timing: { type: GraphQLString },
        reviews: { type: GraphQLString },
        website: { type: GraphQLString },
      },
      async resolve(parent, args) {
        var updaterest = {
          restaurantID: args.restaurantID,
          name: args.name,
          location: args.location,
          email: args.email,
          pass: args.pass,
          description: args.description,
          contact: args.contact,
          timing: args.timing,
          reviews: args.reviews,
          website: args.website,
        };
        Rest_Profile.updateOne(
          { email: args.email },
          { $set: updaterest },
          (error, user) => {
            if (error) {
              return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            } else {
              return { status: 200, message: "UPDATED" };
            }
          }
        );
        //console.log(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
