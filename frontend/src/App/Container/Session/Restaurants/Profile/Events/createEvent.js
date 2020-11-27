import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

class addEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      restaurantID: "",
      restaurantemail: "",
      restaurantname: "",
      customername: "",
      customeremail: "",
      eventID: "",
      eventname: "",
      description: "",
      timeofevent: "",
      date: "",
      location: "",
      hashtag: "",
      message: "",
      dataList: [],
      limit: 2,
      skip: 0,
    };
    // this.nextPage = this.nextPage.bind(this);
    // this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }
  restaurantname = (e) => {
    this.setState({
      restaurantname: e.target.value,
    });
  };
  eventID = (e) => {
    this.setState({
      eventID: e.target.value,
    });
  };
  eventname = (e) => {
    this.setState({
      eventname: e.target.value,
    });
  };

  description = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  timeofevent = (e) => {
    this.setState({
      timeofevent: e.target.value,
    });
  };
  date = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  location = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  hashtag = (e) => {
    this.setState({
      hashtag: e.target.value,
    });
  };

  geteventInfo = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    //make a post request with the user data
    axios
      .get(
        "http://localhost:3001/events/getEvent?restaurantemail=" +
          localStorage.getItem("username")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
          });
          console.log("Event Data", response.data);
          //console.log("Test",this.);
        } else {
          this.setState({
            error: "<p style={{color: red}}>Please enter correct Event</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct Event" + e,
        });
      });
  };
  onSubmit(e) {
    e.preventDefault();
    let data = {
      restaurantemail: localStorage.getItem("username"),
      restaurantname: this.state.restaurantname,
      eventID: this.state.eventID,
      eventname: this.state.eventname,
      location: this.state.location,
      description: this.state.description,
      date: this.state.date,
      timeofevent: this.state.timeofevent,
      hashtag: this.state.hashtag,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post("http://localhost:3001/events/addEvent", data)
      .then((response) => {
        this.setState({
          success: true,
        });
        this.geteventInfo();
        alert("Event created");
      })
      .catch((error) => {
        this.setState({
          message: error.response.data,
        });
      });
  }

  // nextPage() {
  //   console.log("In The Next Function", this.state.skip, this.state.limit);

  //   this.state.skip = this.state.skip + this.state.limit;
  //   console.log("After Next Function", this.state.skip, this.state.limit);
  //   this.geteventInfo();
  // }
  // previousPage() {
  //   console.log("In The Previous Function", this.state.skip, this.state.limit);
  //   if (this.state.skip > 0) {
  //     this.state.skip = this.state.skip - this.state.limit;

  //     this.geteventInfo();
  //   }
  // }

  componentWillMount() {
    this.geteventInfo();
  }

  componentDidMount() {
    // this.setState({
    //   setShow: this.props.show,
    //   eventID: this.props.data[0].eventID,
    //   eventname: this.props.data[0].eventname,
    //   location: this.props.data[0].location,
    //   description: this.props.data[0].description,
    //   date: this.props.data[0].date,
    //   timeofevent: this.props.data[0].timeofevent,
    //   hashtag: this.props.data[0].hashtag,
    //   //   restaurantname: this.props.data[0].name,
    // });
  }
  //   handleClose = () => {
  //     this.props.getInfo();

  //     this.setState({ setShow: false });
  //   };
  //   handleShow = () => {
  //     this.setState({ setShow: true });
  //   };

  render() {
    console.log("Mapp Function", this.state.dataList);
    var details = this.state.dataList.map(
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
          <tr>
            <td>{eventID}</td>
            <td>{eventname}</td>
            <td>{description}</td>
            <td>{timeofevent}</td>
            <td>{date}</td>
            <td>{location}</td>
            <td>{hashtag}</td>
            <td>
              <Link to={`/cust_prof/` + customeremail}>
                <h5 className="mbottom-5">{customeremail}</h5>
              </Link>
            </td>
          </tr>
        );
      }
    );

    return (
      <Container className="background">
        <div>
          <div class="container">
            <h2>User List That Registered for Event</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Name</th>
                  <th>Event Description</th>
                  <th>Event Time</th>
                  <th>Event Date</th>
                  <th>Event Location</th>
                  <th>Event Hashtags</th>
                  <th>Applied Customers</th>
                </tr>
              </thead>
              <tbody>
                {/*Display the Table row based on data recieved*/} {details}
              </tbody>
            </table>
          </div>
        </div>
        <p> </p>
        <Row className="padding-all">
          <div class="container">
            <form onSubmit={this.onSubmit}>
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event ID"
                  onChange={this.eventID}
                  placeholder=" Event ID"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Name"
                  onChange={this.eventname}
                  placeholder="Event Name"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Description"
                  onChange={this.description}
                  placeholder="Event Description"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Participating Restaurant"
                  onChange={this.restaurantname}
                  placeholder="Event Restaurant Name"
                />
              </div>
              <br />
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Time"
                  onChange={this.timeofevent}
                  placeholder="Event Time"
                />
              </div>
              <br />
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Date"
                  onChange={this.date}
                  placeholder="Event Date"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Location"
                  onChange={this.location}
                  placeholder="Event Location"
                />
              </div>
              <br />
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Event Hashtag"
                  onChange={this.hashtag}
                  placeholder="Event Hashtags"
                />
              </div>
              <div style={{ color: "#ff0000" }}>{this.state.message}</div>
              <div style={{ width: "30%" }}>
                <Button variant="danger" type="submit">
                  Create Event
                </Button>
              </div>
            </form>
          </div>
        </Row>
      </Container>
    );
  }
}

export default addEvent;
