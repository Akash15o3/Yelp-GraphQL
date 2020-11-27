var connection = new require("./kafka/Connection");
const Database = require("./config");

let mongoose = require("mongoose");
var Login_Cust = require("./services/loginCust");
var Login_Rest = require("./services/loginRest");
var get_Prof = require("./services/getProfile");
var update_Pers = require("./services/updatePersonalInfo");
var update_Rest = require("./services/updateRest");
var update_Pic = require("./services/updatePic");
var get_RProf = require("./services/getRProfile");
var get_Dish = require("./services/getDish");
var allRest = require("./services/allRestaurant");
var allRestSearch = require("./services/allRestaurantSearch");
var insertOrder = require("./services/insertOrder");
var addEvent = require("./services/addEvent");
var getEvent = require("./services/getEvent");
var getAllEvents = require("./services/getAllEvents");
var getAllEventsDesc = require("./services/getAllEventsDesc");
var applyEvent = require("./services/applyEvent");
var getAppliedEvents = require("./services/getAppliedEvents");
var alleventssearch = require("./services/alleventssearch");
var getallusers = require("./services/getallusers");
var searchallusers = require("./services/searchallusers");
var filterallusers = require("./services/filterallusers");
var insertfollower = require("./services/insertfollower");
var getfollower = require("./services/getfollower");
var insertmessage = require("./services/insertMessage");
var getmessage = require("./services/getMessage");

const connectionString =
  "mongodb+srv://yelp:yelp@yelp.b9er1.mongodb.net/yelp?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // poolSize: 500,
    // bufferMaxEntries: 0,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  if (topic_name != "__consumer_offsets") {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
      console.log(
        "message received for " + topic_name + " ",
        fname,
        "message",
        message
      );
      console.log("message value-----", message.value);
      console.log("fname in server.js kafka backend", fname);
      var data = JSON.parse(message.value);
      console.log(
        "data on kafka server.js",
        data.data,
        "replyto",
        data.replyTo
      );
      fname.handle_request(data.data, function (err, res) {
        console.log("error in fname", err);
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, function (err, data) {
          console.log("Producer data", data);
        });
        return;
      });
    });
  }
}

handleTopicRequest("login_cust", Login_Cust);
handleTopicRequest("login_rest", Login_Rest);
handleTopicRequest("get_Profile", get_Prof);
handleTopicRequest("get_RProfile", get_RProf);
handleTopicRequest("get_Dish", get_Dish);
handleTopicRequest("update_Pers", update_Pers);
handleTopicRequest("update_Rest", update_Rest);
handleTopicRequest("update_Pic", update_Pic);
handleTopicRequest("get_AllRest", allRest);
handleTopicRequest("get_AllRestSearch", allRestSearch);
handleTopicRequest("insert_Order", insertOrder);
handleTopicRequest("insert_Event", addEvent);
handleTopicRequest("get_Event", getEvent);
handleTopicRequest("get_AllEvent", getAllEvents);
handleTopicRequest("get_AllEventDesc", getAllEventsDesc);
handleTopicRequest("apply_Event", applyEvent);
handleTopicRequest("get_AppliedEvent", getAppliedEvents);
handleTopicRequest("alleventssearch", alleventssearch);
handleTopicRequest("get_AllUsers", getallusers);
handleTopicRequest("allusers", searchallusers);
handleTopicRequest("allusersfilter", filterallusers);
handleTopicRequest("insertFollower", insertfollower);
handleTopicRequest("getFollowers", getfollower);
handleTopicRequest("insert_message", insertmessage);
handleTopicRequest("get_message", getmessage);
