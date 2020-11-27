const followerModel = require("../Models/followerModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var newevent = new followerModel({
    customername: msg.customername,
    followcustomerfname: msg.followcustomerfname,
    followcustomerlname: msg.followcustomerlname,
    followcustomercity: msg.followcustomercity,
    followcustomerstate: msg.followcustomerstate,
    followcustomercountry: msg.followcustomercountry,
    followcustomerabout: msg.followcustomerabout,
  });

  followerModel.find(
    { customername: msg.customername },
    newevent.save((error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    })
  );
}

exports.handle_request = handle_request;
