import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import EditDet from "./edit_det";
import axios from "axios";
import cookie from "react-cookies";
import { addDishMutation } from "../../../../../mutation/mutation";
import { getDishQuery } from "../../../../../queries/queries";
import { graphql, compose, withApollo } from "react-apollo";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      restaurantID: "",
      restaurantemail: "",
      restaurantname: "",
      dish_title: "",
      dish_cat: "",
      dish_price: "",
      dish_des: "",
      dish_ing: "",
      message: "",
      dataList: [],
      data: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  dish_title = (e) => {
    this.setState({
      dish_title: e.target.value,
    });
    console.log(e.target.value, this.state.dish_title);
  };
  dish_cat = (e) => {
    this.setState({
      dish_cat: e.target.value,
    });
  };

  dish_des = (e) => {
    this.setState({
      dish_des: e.target.value,
    });
  };

  dish_ing = (e) => {
    this.setState({
      dish_ing: e.target.value,
    });
  };
  dish_price = (e) => {
    this.setState({
      dish_price: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.addDishMutation({
      variables: {
        restaurantemail: this.props.email,
        restaurantname: this.props.name,
        dish_title: this.state.dish_title,
        dish_cat: this.state.dish_cat,
        dish_price: this.state.dish_price,
        dish_des: this.state.dish_des,
        dish_ing: this.state.dish_ing,
      },
    });
    let response = mutationResponse.data.addDishMutation;
    console.log(mutationResponse);
    if (response) {
      if (response.status === "200") {
        alert(response.message);
      } else {
        console.log("unsuccessful");
      }
    }
  };

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getDishQuery,

      variables: { email: localStorage.getItem("remail") },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.dishquery });

    console.log("using apollo client", this.state.data);
  }

  // componentDidMount() {
  //   this.setState({
  //     setShow: this.props.show,
  //     // dish_title: this.props.data[0].dish_title,
  //     // dish_cat: this.props.data[0].dish_cat,
  //     // dish_des: this.props.data[0].dish_des,
  //     // dish_price: this.props.data[0].dish_price,
  //     // restaurantemail: this.props.data[0].restaurantemail,
  //     //   restaurantname: this.props.data[0].name,
  //   });
  // }
  handleClose = () => {
    // this.props.getInfo();

    this.setState({ setShow: false });
  };
  handleShow = () => {
    this.setState({ setShow: true });
  };

  render() {
    console.log("Mapp Function", this.state.dataList);
    var details = this.state.data.map(
      ({
        restaurantemail,
        dish_title,
        dish_cat,
        dish_des,
        dish_price,
        dish_ing,
      }) => {
        return (
          <tr>
            <td>{dish_title}</td>
            <td>{dish_cat}</td>
            <td>{dish_price}</td>
            <td>{dish_des}</td>
            <td>{dish_ing}</td>
          </tr>
        );
      }
    );

    return (
      <Container className="background">
        <Row className="padding-all" style={{ paddingBottom: 0 + "px" }}>
          Email:
          <br /> {this.props.email}
        </Row>
        <Row className="padding-all" style={{ paddingBottom: 0 + "px" }}>
          Website:
          <br /> {this.props.website}
        </Row>

        <Row className="padding-all" style={{ paddingBottom: 0 + "px" }}>
          Timings:
          <br /> {this.props.timing}
        </Row>

        <Row className="padding-all">
          <Button onClick={this.handleShow} variant="danger">
            Edit Info
          </Button>
        </Row>
        <div>
          <div class="container">
            <h2>List of All Dishes</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Dish Category</th>
                  <th>Dish Price</th>
                  <th>Dish Description</th>
                  <th>Dish Ingredients</th>
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
                  name="Dish Name"
                  onChange={this.dish_title}
                  placeholder="Dish Name"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Dish Category"
                  onChange={this.dish_cat}
                  placeholder="Dish Category"
                />
              </div>
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Dish Description"
                  onChange={this.dish_des}
                  placeholder="Dish Description"
                />
              </div>
              <br />
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Dish Ingredients"
                  onChange={this.dish_ing}
                  placeholder="Dish Ingredients"
                />
              </div>
              <br />
              <br />
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Dish Price"
                  onChange={this.dish_price}
                  placeholder="Dish Price"
                />
              </div>
              <br />
              <div style={{ color: "#ff0000" }}>{this.state.message}</div>
              <div style={{ width: "30%" }}>
                <Button variant="danger" type="submit">
                  Add Dish
                </Button>
              </div>
            </form>
          </div>
        </Row>
        <EditDet
          show={this.state.setShow}
          handleClose={this.handleClose}
          data={this.props.data}
        />
      </Container>
    );
  }
}
export default compose(
  withApollo,
  graphql(addDishMutation, { name: "addDishMutation" })
)(Contact);
