import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import User from "./allusers";

import axios from "axios";

class UserDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataListSearch: [],
      dataListFilter: [],
      error: "",
      firstname: "",
      fname: "",
      city: "",
      filterflag: 0,
      limit: 1,
      skip: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.clearFlag = this.clearFlag.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      fname: e.target.value,
    });
    console.log(e.target.value, "state", this.state.fname);
  };

  handleChangeFilter = (e) => {
    this.setState({
      city: e.target.value,
    });
    console.log(e.target.value, "state", this.state.fname);
  };

  city = (e) => {
    this.setState({
      city: e.target.value,
    });
    console.log(e.target.value, "City", this.state.city);
  };

  getInfo = () => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(
        "http://localhost:3001/users/getAllUsers?limit=" +
          this.state.limit +
          "&skip=" +
          this.state.skip
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
          console.log("data", this.state.data);
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

  handleSubmit(e1) {
    console.log("name", this.state.fname);
    // console.log(this.fnameChange, this.fnameChange.firstname);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:3001/users/allusers?fname=" + this.state.fname)
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
    e1.preventDefault();
  }

  handleSubmitFilter(e1) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:3001/allusersfilter?city=" + this.state.city)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataListFilter: response.data,
          });
          // this.getInfo();
          // console.log("Dish Data", response.data);
          console.log("Test", this.state.dataList);
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

    this.setState({ filterflag: 2 });
    e1.preventDefault();
  }

  clearFlag(e) {
    this.setState({ filterflag: 0 });
    this.getInfo();
    e.preventDefault();
  }
  nextPage() {
    console.log("In The Next Function", this.state.skip, this.state.limit);

    this.state.skip = this.state.skip + this.state.limit;
    console.log("After Next Function", this.state.skip, this.state.limit);
    this.getInfo();
  }
  previousPage() {
    console.log("In The Previous Function", this.state.skip, this.state.limit);
    if (this.state.skip > 0) {
      this.state.skip = this.state.skip - this.state.limit;

      this.getInfo();
    }
  }

  componentDidMount() {
    // this.setState({
    //   fname: this.props.data[0].fname,
    // });
    this.getInfo();
  }

  render() {
    const filterflag = this.state.filterflag;
    if (filterflag === 0) {
      var printUser = this.state.data.map(
        ({
          customerID,
          fname,
          lname,
          email,
          pass,
          dateofbirth,
          city,
          State,
          country,
          phonenumber,
          nickname,
          yelpingsince,
          thingsilove,
          about,
          findmein,
          myblog,
        }) => {
          return (
            <User
              id={customerID}
              key={customerID}
              email={email}
              fname={fname}
              lname={lname}
              city={city}
              State={State}
              country={country}
              phonenumber={phonenumber}
              nickname={nickname}
              yelpingsince={yelpingsince}
              thingsilove={thingsilove}
              about={about}
              findmein={findmein}
              myblog={myblog}
              dateofbirth={dateofbirth}
            />
          );
        }
      );
    } else if (filterflag === 1) {
      var printUser = this.state.dataListSearch.map(
        ({
          customerID,
          fname,
          lname,
          email,
          pass,
          dateofbirth,
          city,
          State,
          country,
          phonenumber,
          nickname,
          yelpingsince,
          thingsilove,
          about,
          findmein,
          myblog,
        }) => {
          return (
            <User
              id={customerID}
              key={customerID}
              email={email}
              fname={fname}
              lname={lname}
              city={city}
              State={State}
              country={country}
              phonenumber={phonenumber}
              nickname={nickname}
              yelpingsince={yelpingsince}
              thingsilove={thingsilove}
              about={about}
              findmein={findmein}
              myblog={myblog}
              dateofbirth={dateofbirth}
            />
          );
        }
      );
    } else if (filterflag === 2) {
      var printUser = this.state.dataListFilter.map(
        ({
          customerID,
          fname,
          lname,
          email,
          pass,
          dateofbirth,
          city,
          State,
          country,
          phonenumber,
          nickname,
          yelpingsince,
          thingsilove,
          about,
          findmein,
          myblog,
        }) => {
          return (
            <User
              id={customerID}
              key={customerID}
              email={email}
              fname={fname}
              lname={lname}
              city={city}
              State={State}
              country={country}
              phonenumber={phonenumber}
              nickname={nickname}
              yelpingsince={yelpingsince}
              thingsilove={thingsilove}
              about={about}
              findmein={findmein}
              myblog={myblog}
              dateofbirth={dateofbirth}
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
              name="Search by First Name"
              value={this.state.fname}
              onChange={this.handleChange}
              placeholder="Search by First Name"
            />
          </div>
          <Button variant="danger" type="submit">
            Search by first name
          </Button>
        </form>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        <form onSubmit={this.handleSubmitFilter}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Filter By Location"
              value={this.state.city}
              onChange={this.handleChangeFilter}
              placeholder="Filter By Location"
            />
          </div>
          <Button variant="danger" type="submit">
            Filter by Location
          </Button>
        </form>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        {printUser}
        <br></br>
        <div style={{ "margin-top": "30px" }}>
          <Button class="fa-pull-right" onClick={this.previousPage}>
            Previous Page
          </Button>
          <Button onClick={this.nextPage}> Next Page </Button>
        </div>
      </Container>
    );
  }
}

export default UserDes;
