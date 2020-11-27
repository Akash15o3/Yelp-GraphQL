import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

class RestOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      dataListSearch: [],
      handleChange: "",
      updatedstatus: "",
      filterflag: 0,
      status: "",
      limit: 2,
      skip: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.clearFlag = this.clearFlag.bind(this);
  }

  handleChangeFilter = (e) => {
    this.setState({
      status: e.target.value,
    });
    console.log(e.target.value, "state", this.state.status);
  };

  handleSubmit(e1) {
    console.log("Status", this.state.status);
    // console.log(this.fnameChange, this.fnameChange.firstname);
    axios.defaults.withCredentials = true;

    axios
      .get(
        "http://localhost:3001/orderbystatus?status=" +
          this.state.status +
          "&restaurantEmailForOrder=" +
          sessionStorage.getItem("restaurantEmailForOrder")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataListSearch: response.data,
          });
          // this.getRestOrder();
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
    // this.setState({ filterflag: 1 });
    this.state.filterflag = 1;
    e1.preventDefault();
  }

  clearFlag(e) {
    this.setState({ filterflag: 0 });
    this.getRestOrder();
    e.preventDefault();
  }

  handleChange = (e) => {
    console.log("In Handle CHange", e.target.id);
    this.updatedOrderStatus = e.target.value;

    this.setState({ selectValue: this.updatedOrderStatus });
    const data = {
      updatedStatus: e.target.value,
      timestamp: e.target.id,
    };

    axios
      .post("http://localhost:3001/updateOrderStatus", data)
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
          error: "Please enter correct credentials" + e,
        });
      });
  };

  getRestOrder = () => {
    axios.defaults.withCredentials = true;

    const orderData = {
      restaurantEmailForOrder: sessionStorage.getItem(
        "restaurantEmailForOrder"
      ),
    };

    axios
      .get(
        "http://localhost:3001/getRestOrder?restaurantEmailForOrder=" +
          orderData.restaurantEmailForOrder +
          "&limit=" +
          this.state.limit +
          "&skip=" +
          this.state.skip
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
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
  };

  getTimeOfOrder = (e) => {
    //e.preventDefault();
    console.log("Value of Time", e);
  };

  nextPage() {
    console.log("In The Next Function", this.state.skip, this.state.limit);

    this.state.skip = this.state.skip + this.state.limit;
    console.log("After Next Function", this.state.skip, this.state.limit);
    this.getRestOrder();
  }
  previousPage() {
    console.log("In The Previous Function", this.state.skip, this.state.limit);
    if (this.state.skip > 0) {
      this.state.skip = this.state.skip - this.state.limit;

      this.getRestOrder();
    }
  }

  componentDidMount() {
    this.getRestOrder();
    this.setState({
      handleChange: this.props.handleChange,
      updatedStatus: this.props.updatedstatus,
    });
  }

  render() {
    const filterflag = this.state.filterflag;

    if (filterflag === 0) {
      var display = this.state.dataList.map(
        ({
          customerEmailForOrder,
          restaurantEmailForOrder,
          customerNameForOrder,
          restaurantNameForOrder,
          dishOrder,
          status,
          deliveryType,
          pickupStatus,
          deliveryStatus,
          timeOfOrder,
        }) => {
          return (
            <Container>
              <Row className={"padding-bottom-15 background"}>
                <Col xl={11} style={{ width: 100 + "%" }}>
                  <Container>
                    <Row className="top-10 mleft-10">
                      <Container>
                        <Link
                          id={timeOfOrder}
                          to={`/cust_prof_message/` + customerEmailForOrder}
                          onClick={this.getTimeOfOrder(timeOfOrder)}
                          onR
                        >
                          <h3>Customer Name : {customerNameForOrder}</h3>
                        </Link>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Customer: {customerEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order :
                              <select
                                id={timeOfOrder}
                                defaultValue={status}
                                onChange={this.handleChange}
                              >
                                <option value="Received">Received</option>
                                <option value="Preparing">Preparing</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </h6>
                          </Row>
                          <Row></Row>
                          <Row>
                            <h6 className="small-grey">
                              Dishes Ordered : {dishOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Time of Order : {timeOfOrder}
                            </h6>
                          </Row>
                        </Col>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          );
        }
      );
    } else if (filterflag === 1) {
      var display = this.state.dataListSearch.map(
        ({
          customerEmailForOrder,
          restaurantEmailForOrder,
          customerNameForOrder,
          restaurantNameForOrder,
          dishOrder,
          status,
          deliveryType,
          pickupStatus,
          deliveryStatus,
          timeOfOrder,
        }) => {
          return (
            <Container>
              <Row className={"padding-bottom-15 background"}>
                <Col xl={11} style={{ width: 100 + "%" }}>
                  <Container>
                    <Row className="top-10 mleft-10">
                      <Container>
                        <Link
                          id={timeOfOrder}
                          to={`/cust_prof_message/` + customerEmailForOrder}
                          onClick={this.getTimeOfOrder(timeOfOrder)}
                          onR
                        >
                          <h3>Customer Name : {customerNameForOrder}</h3>
                        </Link>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Customer: {customerEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order :
                              <select
                                id={timeOfOrder}
                                defaultValue={status}
                                onChange={this.handleChange}
                              >
                                <option value="Received">Received</option>
                                <option value="Preparing">Preparing</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Delivery Type : {deliveryType}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Dishes Ordered : {dishOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Time of Order : {timeOfOrder}
                            </h6>
                          </Row>
                        </Col>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          );
        }
      );
    }

    return (
      <div>
        <h1>Received Orders</h1>
        <form onSubmit={this.handleSubmit}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Search by Order Status"
              value={this.state.status}
              onChange={this.handleChangeFilter}
              placeholder="Search by Order Status"
            />
          </div>
          <Button variant="danger" type="submit">
            Search by Order Status
          </Button>
        </form>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        <div>{display}</div>

        <div style={{ "margin-top": "30px" }}>
          <Button class="fa-pull-right" onClick={this.previousPage}>
            Previous Page
          </Button>
          <Button onClick={this.nextPage}> Next Page </Button>
        </div>
      </div>
    );
  }
}

export default RestOrder;
