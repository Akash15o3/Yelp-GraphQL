import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Event from "./events";

import axios from "axios";

class EventDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      customeremail: "",
    };
    // this.submitrest = this.submitrest.bind(this);
  }

  getInfo = () => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios

      .get(
        "http://localhost:3001/events/getAppliedEvents?customeremail=" +
          localStorage.getItem("username")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
          console.log("Event Data", response.data);
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
  componentDidMount() {
    this.getInfo();
  }

  render() {
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
            customername={customername}
            customeremail={customeremail}
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

    return <Container>{printEvent}</Container>;
  }
}

export default EventDes;
