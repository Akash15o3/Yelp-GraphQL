import React from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Desc from "./description";

import Contact from "./contact";
import axios from "axios";
import cookie from "react-cookies";

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      prof_pic: "file",
    };
  }

  getInfo = () => {
    const data2 = {
      email: localStorage.getItem("username"),
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    //make a post request with the user data
    axios
      .get(
        "http://localhost:3001/cust_profile/cust_profile?email=" +
          localStorage.getItem("username")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
          sessionStorage.setItem("customerEmailForOrder", data2.email);
          // sessionStorage.setItem("customerNameForOrder", response.data.fname);
          console.log(
            "name trying",
            response.data.fname,

            this.state.data.fname
          );
          // console.log("Test", response.data);
          //console.log("Test",this.);
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
    var display = this.state.data.map(
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

        prof_pic,
      }) => {
        var pic;
        if (prof_pic == "" || prof_pic == null || prof_pic == undefined) {
          pic = "/profile.png";
        } else {
          pic =
            `http://localhost:3001/prof_pic/` +
            prof_pic.replace("prof_pic", "file") +
            `.jpeg`;
          console.log("pic in Primary", pic);
        }

        return (
          <Container key={customerID}>
            <img
              src={pic}
              alt="user pic"
              style={{ width: 100 + "px", borderRadius: 50 + "%" }}
            />

            <Row className={"padding-bottom-15 background"}>
              <Col xl={11} style={{ width: 100 + "%" }}>
                <Container>
                  <Row className="top-10 mleft-10">
                    <Container>
                      <h3>
                        {fname} {lname}
                      </h3>
                      <h6 className="small-grey">Emailid:{email}</h6>
                      <h5 className="small-grey">Nickname:{nickname}</h5>
                    </Container>
                  </Row>
                  <Row className="mleft-10">
                    <Container>
                      <Col xl={7}>
                        <Row>
                          <h6 className="small-grey">
                            Date Of Birth:{dateofbirth}
                          </h6>
                          <h6 className="small-grey">City:{city}</h6>
                          <h6 className="small-grey">State:{State}</h6>
                          <h6 className="small-grey">Country:{country}</h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Contact Info:{phonenumber}
                          </h6>
                        </Row>
                      </Col>
                      <Col xl={5}>
                        <Row>
                          <h6 className="small-grey">
                            Yelping Since:{yelpingsince}
                          </h6>
                        </Row>
                      </Col>

                      <Col xl={5}>
                        <Row>
                          <h6 className="small-grey">
                            Things I Love:{thingsilove}
                          </h6>
                          <h6 className="small-grey">Find Me In:{findmein}</h6>
                          <h6 className="small-grey">My Blog:{myblog}</h6>
                        </Row>
                      </Col>
                    </Container>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row className="top-10">
              <Col xl={8} style={{ paddingLeft: 0 + "px", width: 100 + "%" }}>
                <Desc about={about} />
              </Col>
              <Col xl={4} style={{ paddingRight: 0 + "px", width: 100 + "%" }}>
                <Contact
                  email={email}
                  myblog={myblog}
                  phonenumber={phonenumber}
                  data={this.state.data}
                  getInfo={this.getInfo}
                />
              </Col>
            </Row>
          </Container>
        );
      }
    );
    return <div>{display}</div>;
  }
}

export default Primary;

// <form onSubmit={this.handleSubmit}>
// <h4>Profile Picture Upload</h4>
//  <input type="file" name="myImage" onChange={this.handleChange} />
//  <button type="submit">Upload</button>
// </form>
