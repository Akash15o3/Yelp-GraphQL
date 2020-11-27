import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import axios from "axios";
import cookie from "react-cookies";

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: "HideForm",
      hideProfileForm: "HideForm",

      restaurantID: "",
      name: "",
      email: "",
      pass: "",
      location: "",
      description: "",

      contact: "",
      timing: "",
      reviews: "",
      website: "",
    };
  }

  getInfo = () => {
    const data = {
      email: this.props.email,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/rest_profile", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            error: "",
            restaurantID: response.data.restaurantID,
            name: response.data.name,
            pass: response.data.pass,
            location: response.data.location,
            description: response.data.description,
            contact: response.data.contact,
            timing: response.data.timing,
            reviews: response.data.reviews,
            website: response.data.website,
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

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <Container key={this.state.restaurantID}>
        <Row className={"padding-bottom-15 background"}>
          <Col xl={11} style={{ width: 100 + "%" }}>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>{this.state.name}</h3>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        Location:{this.state.location}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">Timing:{this.state.timing}</h6>
                    </Row>
                  </Col>

                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Reviews:{this.state.reviews}
                      </h6>
                    </Row>
                  </Col>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="top-10">
          <Col xl={8} style={{ paddingLeft: 0 + "px", width: 100 + "%" }}>
            <h3 className="small-grey">
              Restaurant Description:{this.state.description}
            </h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Primary;
