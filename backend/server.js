const express = require("express");
const { graphqlHTTP } = require("express-graphql");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const multer = require("multer");
var cors = require("cors");
const schema = require("./schema/schema");
const { checkAuth } = require("./passport");
const { frontendURL } = require("./config");

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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.post("/files", upload.single("file"), (req, res) => {
  console.log("In Upload Function    ----", req.body);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(`${req.body.name}`);
});

// app.post("/signupcust", function (req, res) {
//   //console.log("Req Body : ", req.body);
//   var ins = new insert.insert();
//   ins.insert_cust(req, res);
// });

// app.post("/signuprest", function (req, res) {
//   //console.log("Req Body : ", req.body);
//   var ins = new insert.insert();
//   ins.insert_rest(req, res);
// });

// //Route to handle Post Request Call
// app.post("/logincust", function (req, res) {
//   //console.log("Req Body : ", req.body);
//   var ins = new login.login();
//   ins.login_cust(req, res);
// });

// app.post("/loginrest", function (req, res) {
//   console.log("Req Body : ", req.body);
//   var ins = new login.login();
//   ins.login_rest(req, res);
// });

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
// const pic = require("./pic");

// app.use("/cust_profile", cust_profile);
// app.use("/restaurant_profile", rest);
// app.use("/allrestaurant", restA);

app.listen(3001, () => console.log("GraphQL Server Listening on port 3001"));

module.exports = app;
