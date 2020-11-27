import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      handleChange: "",
      customeremail: "",
      customername: "",
      eventID: "",
      restaurantname: "",
    };
  }

  handleChange = (e) => {
    console.log("In Handle CHange");
    // this.updatedOrderStatus = e.target.value;

    // this.setState({ selectValue: this.updatedOrderStatus });
    const data = {
      // customername: sessionStorage.getItem("customerNameForOrder"),
      customeremail: localStorage.getItem("username"),
      eventID: this.props.id,
      restaurantname: this.props.restaurantname,
      restaurantemail: this.props.restaurantemail,
      eventname: this.props.eventname,
      description: this.props.description,
      timeofevent: this.props.timeofevent,
      date: this.props.date,
      location: this.props.location,
      hashtag: this.props.hashtag,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post("http://localhost:3001/events/applyEvent", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
          });
          alert("Event Applied");
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
    this.setState({
      handleChange: this.props.handleChange,
    });
  }
  render() {
    return (
      <Row
        key={this.props.id}
        className={"top-10 background job-listing " + this.props.showJob}
      >
        <Col xl={10}>
          <Container>
            <Link to={`/rest_prof/` + this.props.restaurantemail}>
              <h5 className="mbottom-5">{this.props.restaurantname}</h5>
            </Link>
            <h6 className="mbottom-5">Event ID: {this.props.id}</h6>
            <h6 className="mbottom-5">Event Name: {this.props.eventname}</h6>
            <h6 className="mbottom-5">Description: {this.props.description}</h6>
            <h6 className="mbottom-5">Location: {this.props.location}</h6>
            <h6 className="mbottom-5">Date of Event: {this.props.date}</h6>
            <h6 className="mbottom-5">
              Time of Attendance: {this.props.timeofevent}
            </h6>
            <h6 className="mbottom-5">Hashtags: {this.props.hashtag}</h6>

            <br></br>
            <Button variant="danger" onClick={this.handleChange}>
              {" "}
              Apply to this Event
            </Button>
            <br></br>
            <br></br>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Event;
