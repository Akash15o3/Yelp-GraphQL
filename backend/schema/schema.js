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

const getDishModel = new GraphQLObjectType({
  name: "Dish",
  fields: () => ({
    _id: { type: GraphQLID },
    restaurantemail: { type: GraphQLString },
    dish_title: { type: GraphQLString },
    dish_cat: { type: GraphQLString },
    dish_price: { type: GraphQLString },
    dish_des: { type: GraphQLString },
    dish_ing: { type: GraphQLString },
  }),
});

const dishOrder = new GraphQLObjectType({
  name: "dishOrder",
  fields: () => ({
    _id: { type: GraphQLID },
    customerEmailForOrder: { type: GraphQLString },
    restaurantEmailForOrder: { type: GraphQLString },
    customerNameForOrder: { type: GraphQLString },
    restaurantNameForOrder: { type: GraphQLString },
    status: { type: GraphQLString },
    deliveryType: { type: GraphQLString },
    pickupStatus: { type: GraphQLString },
    deliveryStatus: { type: GraphQLString },
    timeOfOrder: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    dishOrder: { type: GraphQLString },
    //  dishOrder: { type: GraphQLList() },
    // dishOrder: {
    //   type: new GraphQLList(dishes),
    //   resolve(parent, args) {
    //     return parent.dishOrder;
    //   },
    // },
  }),
});
const dishes = new GraphQLObjectType({
  name: "dishes",
  fields: () => ({
    dishname: {
      type: GraphQLString,
    },
  }),
});

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
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        let user = Cust_Profile.findOne({ email: args.email });
        if (user) {
          return user;
        }
      },
    },
    restaurant: {
      type: RestProfileModel,
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log("in return res profile");
        let user = await Rest_Profile.findOne({ email: args.email });
        if (user) {
          // console.log("rest details", user);
          return user;
        }
      },
    },

    dishquery: {
      type: new GraphQLList(getDishModel),
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log("in return res profile");
        let user = await Dish.find({ restaurantemail: args.email });
        if (user) {
          console.log("dish details", user);
          return user;
        }
      },
    },

    restaurantOrder: {
      type: new GraphQLList(dishOrder),
      args: { restaurantEmailForOrder: { type: GraphQLString } },
      async resolve(parent, args) {
        let user = await Order.find({
          restaurantEmailForOrder: args.restaurantEmailForOrder,
        });
        if (user) {
          console.log("dish order from restaurant", user);
          return user;
        }
      },
    },

    restaurantOrderByStatus: {
      type: new GraphQLList(dishOrder),
      args: {
        restaurantEmailForOrder: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(
          "values for searching",
          args.restaurantEmailForOrder,
          args.status
        );
        let user = await Order.find({
          restaurantEmailForOrder: args.restaurantEmailForOrder,
          status: args.status,
        });
        if (user) {
          console.log("dish order from restaurant", user);
          return user;
        }
      },
    },
    customerOrderByStatus: {
      type: new GraphQLList(dishOrder),
      args: {
        customerEmailForOrder: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(
          "values for searching",
          args.restaurantEmailForOrder,
          args.status
        );
        let user = await Order.find({
          customerEmailForOrder: args.customerEmailForOrder,
          status: args.status,
        });
        if (user) {
          console.log("dish order from restaurant", user);
          return user;
        }
      },
    },

    customerOrder: {
      type: new GraphQLList(dishOrder),
      args: { customerEmailForOrder: { type: GraphQLString } },
      async resolve(parent, args) {
        let user = await Order.find({
          customerEmailForOrder: args.customerEmailForOrder,
        });
        if (user) {
          console.log("dish order from restaurant", user);
          return user;
        }
      },
    },

    getCustomerOrderDesc: {
      type: new GraphQLList(dishOrder),
      args: { customerEmailForOrder: { type: GraphQLString } },
      async resolve(parent, args) {
        var mysort = { timestamp: -1 };
        let user = await Order.find({
          customerEmailForOrder: args.customerEmailForOrder,
        }).sort(mysort);
        if (user) {
          console.log("dish order from restaurant", user);
          return user;
        }
      },
    },

    getAllRestaurantQuery: {
      type: new GraphQLList(RestProfileModel),
      args: { location: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurantList = await Rest_Profile.find({
          location: args.location,
        });
        return restaurantList;
      },
    },
    allRestaurantByLocation: {
      type: new GraphQLList(RestProfileModel),
      args: { location: { type: GraphQLString } },
      async resolve(parent, args) {
        let restaurantList = await Rest_Profile.find({});
        return restaurantList;
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

    adddish: {
      type: StatusType,
      args: {
        restaurantemail: { type: GraphQLString },
        dish_title: { type: GraphQLString },
        dish_cat: { type: GraphQLString },
        dish_price: { type: GraphQLString },
        dish_des: { type: GraphQLString },
        dish_ing: { type: GraphQLString },
      },
      resolve(parent, args) {
        //console.log("Stud Signup" + args);
        var newuser = new Dish({
          restaurantemail: args.restaurantemail,
          dish_title: args.dish_title,
          dish_cat: args.dish_cat,
          dish_price: args.dish_price,
          dish_des: args.dish_des,
          dish_ing: args.dish_ing,
        });
        newuser.save((error, data) => {
          if (data) {
            return { status: 200, message: "Dish_ADDED" };
          } else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          }
        });
      },
    },

    addOrder: {
      type: StatusType,
      args: {
        customerEmailForOrder: { type: GraphQLString },
        restaurantEmailForOrder: { type: GraphQLString },
        customerNameForOrder: { type: GraphQLString },
        restaurantNameForOrder: { type: GraphQLString },
        status: { type: GraphQLString },
        deliveryType: { type: GraphQLString },
        pickupStatus: { type: GraphQLString },
        deliveryStatus: { type: GraphQLString },
        timeOfOrder: { type: GraphQLString },
        // timestamp: { type: GraphQLString },
        status: { type: GraphQLString },
        dishOrder: { type: GraphQLString },
      },
      resolve(parent, args) {
        //console.log("Stud Signup" + args);
        var newuser = new Order({
          customerEmailForOrder: args.customerEmailForOrder,
          restaurantEmailForOrder: args.restaurantEmailForOrder,
          customerNameForOrder: args.customerNameForOrder,
          restaurantNameForOrder: args.restaurantNameForOrder,
          status: args.status,
          deliveryType: args.deliveryType,
          pickupStatus: args.pickupStatus,
          deliveryStatus: args.deliveryStatus,
          timeOfOrder: args.timeOfOrder,
          status: args.status,

          dishOrder: args.dishOrder,
        });
        console.log("in resolve function and order details", newuser);
        newuser.save((error, data) => {
          console.log("if save mode", data);
          if (data) {
            return { status: 200, message: "Dish_ADDED" };
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
        console.log("in return login", args);
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
        // pass: { type: GraphQLString },
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
          // pass: args.pass,
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

    updateOrderStatus: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      async resolve(parent, args) {
        var updaterest = {
          status: args.status,
        };
        Order.findOneAndUpdate(
          { _id: args._id },
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

    addReview: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        reviews: { type: GraphQLString },
      },
      async resolve(parent, args) {
        var updaterest = {
          reviews: args.reviews,
        };
        Rest_Profile.findOneAndUpdate(
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
