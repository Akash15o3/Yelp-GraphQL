var app = require("../server");
var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);
const auth =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1YTY5MDhiMDcxNjU3ODBmMDQxMDQiLCJ1c2VybmFtZSI6ImtmY0BnbWFpbC5jb20iLCJ0eXBlIjoiUmVzdGF1cmFudCIsImlhdCI6MTYwNDgwNzY0MSwiZXhwIjoxNjA1ODE1NjQxfQ.evPZbgZ4V-L6H1e30urkphDUVdBDmy6_tQdlu8X5qac";
describe("Yelp App- Connected to Database", function () {
  it("POST /loginCust - login Customer", function (done) {
    agent
      .post("/logincust")
      .send({ username: "aggarwalakash15@gmail.com", password: "akashcan" })
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("POST /loginRest - login Restaurant", function (done) {
    agent
      .post("/loginrest")
      .send({ username: "kfc@gmail.com", password: "kfc" })
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("GET /cust_profile - Get Customer", function (done) {
    agent
      .get("/cust_profile/cust_profile?email=david@gmail.com")
      .send({ user_id: "5f9cca893756ff1710ddfa86" })
      .set("Authorization", auth)
      .then(function (res) {
        expect(JSON.parse(res.text)[0].fname).to.equal("David");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("GET /rest_profile - Get Restaurant", function (done) {
    agent
      .get("/restaurant_profile/getRest?email=kfc@gmail.com")
      .send({ user_id: "5f95a6908b07165780f04104" })
      .set("Authorization", auth)
      .then(function (res) {
        expect(JSON.parse(res.text)[0].name).to.equal("KFC");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("GET /events - Get Events", function (done) {
    agent
      .get("/events/getAllEvents")
      .send({ user_id: "5f9a3f31c0aca161fc66d631" })
      .set("Authorization", auth)
      .then(function (res) {
        expect(JSON.parse(res.text)[0].eventname).to.equal("Chick-A");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
