import React from "react";
import { Container, Row, Button, Col, Form, Modal } from "react-bootstrap";
// import EditDet from "./edit_det";
import axios from "axios";
import cookie from "react-cookies";

class Dish extends React.Component {
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
      title: [],
      // dishOrder:[],
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  getdishInfo = () => {
    axios.defaults.withCredentials = true;
    const data = {
      email: this.props.email,
    };
    console.log("in dish", data.email);
    //make a post request with the user data
    axios
      .get("http://localhost:3001/getDish?restaurantemail=" + data.email)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
          });
          console.log("Dish Data", response.data);
          //console.log("Test",this.);
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
  };

  componentDidMount() {
    this.getdishInfo();
    // this.orderNow();
  }

  addDishToCart(dish_title) {
    var dishTitle = dish_title.dish_title;

    var dishInStorage = sessionStorage.getItem("dishOrder");
    console.log("Dish In Storage ", dishInStorage);
    dishInStorage = JSON.parse(dishInStorage);
    console.log("Dish In Storage Parsed ", dishInStorage);

    if (dishInStorage.length === 0) {
      console.log("Length is Zero");
      dishInStorage.push(dishTitle);
      dishInStorage = JSON.stringify(dishInStorage);
      sessionStorage.setItem("dishOrder", dishInStorage);
    } else {
      console.log("In Else");
      dishInStorage.push(dishTitle);
      dishInStorage = JSON.stringify(dishInStorage);
      sessionStorage.setItem("dishOrder", dishInStorage);
    }

    alert("Dish added to Cart");
  }

  render() {
    console.log("Mapp Function", this.state.dataList);
    var details = this.state.dataList.map(
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
            <td> {dish_title} </td>

            <td>{dish_cat}</td>
            <td>{dish_price}</td>
            <td>{dish_des}</td>
            <td>{dish_ing}</td>
            <td>
              <Button
                type="button"
                variant="danger"
                key={dish_title}
                onClick={() => this.addDishToCart({ dish_title })}
              >
                Add to Cart
              </Button>
            </td>
          </tr>
        );
      }
    );

    return (
      <Container className="background">
        <Row className="padding-all"></Row>
        <div>
          <h2>List of All Dishes</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Dish Category</th>
                <th>Dish Price</th>
                <th>Dish Description</th>
                <th>Dish Ingredients</th>
                <th>Add Dishes</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Table row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
      </Container>
    );
  }
}

export default Dish;
