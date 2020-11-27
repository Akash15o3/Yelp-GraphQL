import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class Cust_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: "HideForm",
      hideProfileForm: "HideForm",
      hideObj: "HideForm",
      contact: "",
      email: "",
      website: "",
      name: "",
      dishOrder: [],
    };
  }

  getInfo = () => {
    const data = {
      email: this.props.match.params.customerEmailForOrder,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/customer_profile", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            pass: response.data.pass,
            fname: response.data.fname,
            lname: response.data.lname,
            dateofbirth: response.data.dateofbirth,
            city: response.data.city,
            State: response.data.State,
            country: response.data.country,
            phonenumber: response.data.phonenumber,
            nickname: response.data.nickname,
            yelpingsince: response.data.yelpingsince,
            thingsilove: response.data.thingsilove,
            about: response.data.about,
            findmein: response.data.findmein,
            myblog: response.data.myblog,
            customerID: response.data.customerID,
            email: response.data.email,
            // contact: response.data.contact,
            // name: response.data.name,
            // email: response.data.email,
            // website: response.data.website,
          });
          console.log("Response Post Call", response);
          console.log(
            "Email Value",
            this.props.match.params.customerEmailForOrder
          );
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
    return (
      <Container style={{ width: 80 + "%" }}>
        <Row>
          <Col xl={5}>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              <Container key={this.state.customerID}>
                <Row className={"padding-bottom-15 background"}>
                  <Col xl={11} style={{ width: 100 + "%" }}>
                    <Container>
                      <Row className="top-10 mleft-10">
                        <Container>
                          <h3>
                            {this.state.fname} {this.state.lname}
                          </h3>
                        </Container>
                      </Row>
                      <Row className="mleft-10">
                        <Container>
                          <Col xl={5}>
                            <Row>
                              <h3 className="small-grey">
                                nickname:{this.state.nickname}
                              </h3>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                Location:{this.state.city},{this.state.state},
                                {this.state.country}
                              </h6>
                            </Row>
                          </Col>
                          <Col xl={5}>
                            <Row>
                              <h6 className="small-grey">
                                Contact Number:{this.state.phonenumber}
                              </h6>
                            </Row>
                          </Col>

                          <Col xl={5}>
                            <Row>
                              <h6 className="small-grey">
                                EmailID:{this.state.email}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                thingd I Love:{this.state.thingsilove}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                Find Me In:{this.state.findmein}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                MyBlog:{this.state.myblog}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                YelpingSince:{this.state.yelpingsince}
                              </h6>
                            </Row>
                          </Col>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className="top-10">
                  <Col
                    xl={5}
                    style={{ paddingLeft: 0 + "px", width: 100 + "%" }}
                  >
                    <h3 className="small-grey">About Me:{this.state.about}</h3>
                  </Col>
                </Row>
              </Container>
            </Row>
            <Row className="all-row"></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cust_Profile;
