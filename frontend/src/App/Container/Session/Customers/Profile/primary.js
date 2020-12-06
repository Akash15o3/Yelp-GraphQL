import React from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Desc from "./description";

import Contact from "./contact";
import axios from "axios";
import cookie from "react-cookies";
import { getCustomerQuery } from "../../../../../queries/queries";
import { graphql, compose, withApollo } from "react-apollo";

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      prof_pic: "file",
    };
  }
  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getCustomerQuery,

      variables: { email: localStorage.getItem("_id") },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.customer });

    console.log("using apollo client", this.state.data);
  }
  // componentDidMount() {
  //   console.log("datadata Profile ", this.props.data);
  //   if (this.props.data.customer) {
  //     let props = this.props.data.customer;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  //   sessionStorage.setItem("customerNameForOrder", this.state.data.fname);
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("Data Update in profile ", this.props.data);
  //   if (this.props.data !== prevProps.data) {
  //     let props = this.props.data.customer;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  //   sessionStorage.setItem("customerNameForOrder", this.state.data.fname);
  // }
  render() {
    console.log(this.state.data);
    var pic = "/profile.png";
    return (
      <Container key={this.state.data._id}>
        <Row className={"padding-bottom-15 background"}>
          <Col xl={11} style={{ width: 100 + "%" }}>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>
                    {this.state.data.fname} {this.state.data.lname}
                  </h3>
                  <h6 className="small-grey">
                    Emailid:{this.state.data.email}
                  </h6>
                  <h5 className="small-grey">
                    Nickname:{this.state.data.nickname}
                  </h5>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        Date Of Birth:{this.state.data.dateofbirth}
                      </h6>
                      <h6 className="small-grey">
                        , City:{this.state.data.city}
                      </h6>
                      <h6 className="small-grey">
                        , State:{this.state.data.State}
                      </h6>
                      <h6 className="small-grey">
                        , Country:{this.state.data.country}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        Contact Info:{this.state.data.phonenumber}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Yelping Since:{this.state.data.yelpingsince}
                      </h6>
                    </Row>
                  </Col>

                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Things I Love:{this.state.data.thingsilove}
                      </h6>
                      <h6 className="small-grey">
                        Find Me In:{this.state.data.findmein}
                      </h6>
                      <h6 className="small-grey">
                        My Blog:{this.state.data.myblog}
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
            <Desc about={this.state.data.about} />
          </Col>
          <Col xl={4} style={{ paddingRight: 0 + "px", width: 100 + "%" }}>
            <Contact
              email={this.state.data.email}
              myblog={this.state.data.myblog}
              phonenumber={this.state.data.phonenumber}
              data={this.state.data}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withApollo(Primary);
