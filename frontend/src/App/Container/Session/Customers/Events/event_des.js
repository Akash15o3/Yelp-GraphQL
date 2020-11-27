import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Event from "./allevents";

import axios from "axios";

class EventDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      eventname: "",
      filterflag: 0,
      filterdesc: 0,
      dataListSearch: [],
      datadesc: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFlag = this.clearFlag.bind(this);
    this.doDesc = this.doDesc.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      eventname: e.target.value,
    });
    console.log(e.target.value, "state", this.state.eventname);
  };
  getInfo = () => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:3001/events/getAllEvents")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
        } else {
          this.setState({
            error:
              "<p style={{color: red}}>Please enter correct credentials</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct credentials" + e,
        });
      });
  };

  doDesc(e1) {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:3001/events/getAllEventsDesc")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            datadesc: response.data,
          });
          this.getInfo();
          console.log("response for event desc", this.state.datadesc);
        } else {
          this.setState({
            error:
              "<p style={{color: red}}>Please enter correct credentials</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct credentials" + e,
        });
      });
    this.setState({ filterdesc: 1 });
    this.setState({ filterflag: 2 });
  }
  handleSubmit(e1) {
    console.log("name", this.state.eventname);
    // console.log(this.fnameChange, this.fnameChange.firstname);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(
        "http://localhost:3001/events/alleventssearch?eventname=" +
          this.state.eventname
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataListSearch: response.data,
          });
          this.getInfo();
          // console.log("Dish Data", response.data);
          console.log("Test", this.state.dataListSearch);
        } else {
          this.setState({
            error: "<p style={{color: red}}>Please enter correct Email</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct Email" + e,
        });
      });
    this.setState({ filterflag: 1 });
    console.log("filter flag after search", this.state.filterflag);
    e1.preventDefault();
  }
  clearFlag(e) {
    console.log("filter flag before clear", this.state.filterflag);
    this.setState({ filterflag: 0 });
    // this.state.filterflag = 0;
    this.getInfo();
    e.preventDefault();
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const filterflag = this.state.filterflag;
    const filterdesc = this.state.filterdesc;
    // if (filterdesc === 0) {
    //   var printEvent = this.state.data.map(
    //     ({
    //       restaurantemail,
    //       restaurantname,
    //       customeremail,
    //       customername,
    //       eventID,
    //       eventname,
    //       description,
    //       timeofevent,
    //       date,
    //       location,
    //       hashtag,
    //     }) => {
    //       return (
    //         <Event
    //           id={eventID}
    //           key={eventID}
    //           restaurantemail={restaurantemail}
    //           location={location}
    //           restaurantname={restaurantname}
    //           eventname={eventname}
    //           description={description}
    //           timeofevent={timeofevent}
    //           date={date}
    //           hashtag={hashtag}
    //           timeofevent={timeofevent}
    //         />
    //       );
    //     }
    //   );
    // } else if (filterdesc === 1) {
    //   var printEvent = this.state.datadesc.map(
    //     ({
    //       restaurantemail,
    //       restaurantname,
    //       customeremail,
    //       customername,
    //       eventID,
    //       eventname,
    //       description,
    //       timeofevent,
    //       date,
    //       location,
    //       hashtag,
    //     }) => {
    //       return (
    //         <Event
    //           id={eventID}
    //           key={eventID}
    //           restaurantemail={restaurantemail}
    //           location={location}
    //           restaurantname={restaurantname}
    //           eventname={eventname}
    //           description={description}
    //           timeofevent={timeofevent}
    //           date={date}
    //           hashtag={hashtag}
    //           timeofevent={timeofevent}
    //         />
    //       );
    //     }
    //   );
    // }
    if (filterflag === 0) {
      var printEvent = this.state.data.map(
        ({
          restaurantemail,
          restaurantname,
          customeremail,
          customername,
          eventID,
          eventname,
          description,
          timeofevent,
          date,
          location,
          hashtag,
        }) => {
          return (
            <Event
              id={eventID}
              key={eventID}
              restaurantemail={restaurantemail}
              location={location}
              restaurantname={restaurantname}
              eventname={eventname}
              description={description}
              timeofevent={timeofevent}
              date={date}
              hashtag={hashtag}
              timeofevent={timeofevent}
            />
          );
        }
      );
    } else if (filterflag === 1) {
      var printEvent = this.state.dataListSearch.map(
        ({
          restaurantemail,
          restaurantname,
          customeremail,
          customername,
          eventID,
          eventname,
          description,
          timeofevent,
          date,
          location,
          hashtag,
        }) => {
          return (
            <Event
              id={eventID}
              key={eventID}
              restaurantemail={restaurantemail}
              location={location}
              restaurantname={restaurantname}
              eventname={eventname}
              description={description}
              timeofevent={timeofevent}
              date={date}
              hashtag={hashtag}
              timeofevent={timeofevent}
            />
          );
        }
      );
    } else if (filterflag === 2) {
      var printEvent = this.state.datadesc.map(
        ({
          restaurantemail,
          restaurantname,
          customeremail,
          customername,
          eventID,
          eventname,
          description,
          timeofevent,
          date,
          location,
          hashtag,
        }) => {
          return (
            <Event
              id={eventID}
              key={eventID}
              restaurantemail={restaurantemail}
              location={location}
              restaurantname={restaurantname}
              eventname={eventname}
              description={description}
              timeofevent={timeofevent}
              date={date}
              hashtag={hashtag}
              timeofevent={timeofevent}
            />
          );
        }
      );
    }

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Search by Event Name"
              value={this.state.eventname}
              onChange={this.handleChange}
              placeholder="Search by event Name"
            />
          </div>
          <Button variant="danger" type="submit">
            Search by event name
          </Button>
        </form>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        <h4>Sort By Time Of Event (by Default Ascending)</h4>
        <br></br>
        <Button variant="danger" onClick={this.doDesc}>
          Descending
        </Button>
        <br></br>
        <br></br>
        {printEvent}
      </Container>
    );
  }
}

export default EventDes;
