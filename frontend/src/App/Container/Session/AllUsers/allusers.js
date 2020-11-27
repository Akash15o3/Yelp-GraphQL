import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class User extends React.Component {
  onSubmit(ab) {
    // e.preventDefault();
    alert("Follow Button activated");
    console.log("follow user name", this.props.fname);
    const myfollowers = {
      customername: localStorage.getItem("username"),
      followcustomerfname: this.props.fname,
      followcustomerlname: this.props.lname,
      followcustomercity: this.props.city,
      followcustomerstate: this.props.State,
      followcustomercountry: this.props.country,
      followcustomercityabout: this.props.about,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post("http://localhost:3001/insertFollower", myfollowers)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
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
          error: "Error while ordering" + e,
        });
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
            <Link to={`/cust_prof/` + this.props.email}>
              <h5 className="mbottom-5">
                {this.props.fname} {this.props.lname}
              </h5>
            </Link>
            <h6 className="mbottom-5">
              Location : {this.props.city} , {this.props.State} ,{" "}
              {this.props.country}
            </h6>
            <h6 className="mbottom-5">MyBlog : {this.props.myblog} </h6>
            <h6 className="mbottom-5">
              YelpingSince : {this.props.yelpingsince}{" "}
            </h6>
            <h6 className="mbottom-5">About : {this.props.about} </h6>
            <br></br>
            <Button variant="danger" onClick={() => this.onSubmit("yes")}>
              Follow
            </Button>
            <br></br>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default User;
