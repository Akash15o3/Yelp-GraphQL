import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Desc from "./description";
import Contact from "./contact";
import axios from "axios";
import cookie from "react-cookies";
import { getRestaurantQuery } from "../../../../../queries/queries";
import { graphql, compose, withApollo } from "react-apollo";
class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: "",
      data: [],
      prof_pic: "",
      dish_pic: "",
    };
  }

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getRestaurantQuery,

      variables: { email: localStorage.getItem("_id") },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.restaurant });

    console.log("using apollo client", this.state.data);
  }

  // componentDidMount() {
  //   console.log("datadata Profile ", this.props.data.email);
  //   if (this.props.data.restaurant) {
  //     let props = this.props.data.restaurant;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("Data Update in profile ", this.props.data);
  //   if (this.props.data !== prevProps.data) {
  //     let props = this.props.data.restaurant;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  // }

  render() {
    var pic;
    if (
      this.state.prof_pic == "" ||
      this.state.prof_pic == null ||
      this.state.prof_pic == undefined
    ) {
      pic = "/profile.png";
    }

    return (
      <Container>
        <Row className={"padding-bottom-15 background"}>
          <Col xl={11} style={{ width: 100 + "%" }}>
            <Col xl={1}>
              <img
                src={pic}
                alt="user pic"
                style={{ width: 100 + "px", marginTop: 20 + "px" }}
              />
            </Col>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>{this.state.data.name}</h3>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        Location:{this.state.data.location}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        Contact Info:{this.state.data.contact}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Timing:{this.state.data.timing}
                      </h6>
                    </Row>
                  </Col>

                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Reviews:{this.state.data.reviews}
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
            <Desc des={this.state.data.description} />
          </Col>

          <Col xl={4} style={{ paddingRight: 0 + "px", width: 100 + "%" }}>
            <Contact
              email={this.state.data.email}
              website={this.state.data.website}
              contact={this.state.data.contact}
              timing={this.state.data.timing}
              data={this.state.data}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withApollo(Primary);
// compose(
//   graphql(getRestaurantQuery, {
//     options: {
//       // fetchPolicy: "cache-and-network",
//       variables: { email: localStorage.getItem("_id") },
//     },
//   })
// )
