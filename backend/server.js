const express = require("express");

var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const multer = require("multer");
var cors = require("cors");

// const events = require("./events");
// const insert = require("./insert");
// const login = require("./login");
// const cust_profile = require("./profile");
// const rest = require("./restaurant");
// const restA = require("./rest");
// const orders = require("./orders");
// const allusers = require("./allusers");
// const follower = require("./follower");
// const messages = require("./messages");
const { checkAuth } = require("./passport");

app.set("view engine", "ejs");
app.use("/prof_pic", express.static("public/uploads"));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273Lab1",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const mongoose = require("mongoose");
const { mongoDB } = require("./config");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log("Error", err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    console.log("file send", file);
    cb(null, `${file.originalname}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/files", upload.single("file"), (req, res) => {
  console.log("In Upload Function    ----", req.body);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(`${req.body.name}`);
});

app.post("/signupcust", function (req, res) {
  //console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_cust(req, res);
});

app.post("/signuprest", function (req, res) {
  //console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_rest(req, res);
});

//Route to handle Post Request Call
app.post("/logincust", function (req, res) {
  //console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_cust(req, res);
});

app.post("/loginrest", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_rest(req, res);
});

const events = require("./events");
const insert = require("./insert");
const login = require("./login");
const cust_profile = require("./profile");
const rest = require("./restaurant");
const restA = require("./rest");
const orders = require("./orders");
const allusers = require("./allusers");
const follower = require("./follower");
const messages = require("./messages");
const pic = require("./pic");

app.use("/cust_profile", cust_profile);
app.use("/restaurant_profile", rest);
app.use("/allrestaurant", restA);

// app.get("/getRest", function (req, res) {
//   //console.log("Req Body : ", req.body);
//   var get = new rest.restaurant();
//   get.getrest(req, res);
// });

// app.post("/rest_profile", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new rest.restaurant();
//   get.gettestrest(req, res);
// });

app.post("/rest_profile", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.gettestrest(req, res);
});

app.post("/updateProfPic", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new pic.pic();
  ins.updateprofinfo(req, res);
});

app.post("/updateProfPicRest", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.updateprofinfo(req, res);
});

app.post("/updateDishPicRest", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.updatedishinfo(req, res);
});
app.post("/customer_profile", function (req, res) {
  //console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.gettestcust(req, res);
});

app.post("/addDish", function (req, res) {
  // console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.adddish(req, res);
});

app.get("/getDish", function (req, res) {
  // console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.getdish(req, res);
});

app.get("/allusersfilter", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new pic.pic();
  get.filterallusers(req, res);
});

// app.post("/customer_profile", function (req, res) {
//   //console.log("Req Body : ", req.body);
//   var get = new cust_profile.profile();
//   get.gettestcust(req, res);
// });

// app.post("/updateRest", function (req, res) {
//   // console.log("Req Body : ", req.body);
//   var get = new rest.restaurant();
//   get.updatebasicinfo(req, res);
// });

// app.get("/getDish", function (req, res) {
//   // console.log("Req Body : ", req.body);
//   var get = new rest.restaurant();
//   get.getdish(req, res);
// });

// app.get("/cust_profile", function (req, res) {
//   // console.log("Req Body : ", req.body);
//   var ins = new cust_profile.profile();
//   ins.getbasicinfo(req, res);
// });

// app.post("/updatePersonal", function (req, res) {
//   // console.log("Req Body : ", req.body);
//   var ins = new cust_profile.profile();
//   ins.updatebasicinfo(req, res);
// });

// app.get("/getAllRest", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var rest = new restA.rest();
//   rest.getAllRest(req, res);
// });

// app.get("/allrestsearch", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var rest = new restA.rest();
//   rest.getAllRestSearch(req, res);
// });

app.post("/insertOrder", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.insertOrder(req, res);
});

app.post("/insertReview", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new rest.restaurant();
  get.insertreview(req, res);
});

app.get("/getCustOrder", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.getCustOrder(req, res);
});

app.get("/getCustOrderDesc", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.getCustOrderDesc(req, res);
});

app.get("/getRestOrder", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.getRestOrder(req, res);
});

app.get("/orderbystatus", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.getRestByStatus(req, res);
});

app.get("/orderbystatuscustomer", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.getCustByStatus(req, res);
});

app.post("/updateOrderStatus", function (req, res) {
  console.log("Req Body : ", req.body);
  var order = new orders.orders();
  order.updateOrderStatus(req, res);
});
//////////////////////////////////////////////////////

app.use("/events", events);

// app.post("/addEvent", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.addevent(req, res);
// });

// app.get("/getEvent", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.getevent(req, res);
// });

// app.get("/getAllEvents", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.getAllEvent(req, res);
// });

// app.get("/getAllEventsDesc", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.getAllEventDesc(req, res);
// });

// app.post("/applyEvent", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.applyEvent(req, res);
// });

// app.get("/getAppliedEvents", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new events.events();
//   get.getAppliedEvents(req, res);
// });

// app.get("/alleventssearch", function (req, res) {
//   console.log("Req Body search : ", req.body);
//   var get = new events.events();
//   get.getalleventssearch(req, res);
// });

///////////////////////////////////////////
app.use("/users", allusers);
// app.use("/following", follower);

// app.get("/getAllUsers", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new allusers.allusers();
//   get.getAllUsers(req, res);
// });

// app.get("/allusers", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var get = new allusers.allusers();
//   get.searchallusers(req, res);
// });

app.post("/insertFollower", function (req, res) {
  console.log("Req Body : ", req.body);
  var follow = new follower.follower();
  follow.insertFollower(req, res);
});

app.get("/getFollowers", function (req, res) {
  console.log("Req Body : ", req.body);
  var follow = new follower.follower();
  follow.getFollower(req, res);
});

app.post("/insertMessage", function (req, res) {
  console.log("Req Body : ", req.body);
  var message = new messages.messages();
  message.insertmessage(req, res);
});

app.get("/getAllMessages", function (req, res) {
  console.log("Req Body : ", req.body);
  var message = new messages.messages();
  message.getmessages(req, res);
});
app.listen(3001, () => console.log("Server Listening on port 3001"));

module.exports = app;
