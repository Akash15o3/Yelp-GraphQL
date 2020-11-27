import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      prof_pic: "",
      dish_pic: "",
      id: "",
      rest_name: "",
      location: "",
      des: "",
      timing: "",
      contact: "",
      website: "",
      title: "",
      cat: "",
      price: "",
      reviews: "",
      email: "",
    };
  }
  id = (e) => {
    this.setState({
      id: e.target.value,
    });
  };
  restName = (e) => {
    this.setState({
      rest_name: e.target.value,
    });
  };

  location = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  desc = (e) => {
    this.setState({
      des: e.target.value,
    });
  };

  timing = (e) => {
    this.setState({
      timing: e.target.value,
    });
  };

  contact = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };

  website = (e) => {
    this.setState({
      website: e.target.value,
    });
  };

  email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  reviews = (e) => {
    this.setState({
      reviews: e.target.value,
    });
  };
  updatePers = (e) => {
    e.preventDefault();
    const data = {
      rest_name: this.state.rest_name,
      location: this.state.location,
      des: this.state.des,
      timing: this.state.timing,
      contact: this.state.contact,
      website: this.state.website,
      email: this.state.email,
      reviews: this.state.reviews,

      id: this.state.id,
      prof_pic: this.state.prof_pic,
      dish_pic: this.state.dish_pic,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    //make a post request with the user data
    axios
      .post("http://localhost:3001/restaurant_profile/updateRest", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
          });
          this.handleClose();
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
  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  handleFileUpload = (event) => {
    let data = new FormData();
    console.log("File Data --", event.target.files[0]);
    data.append("file", event.target.files[0]);
    data.append("name", "prof_pic");
    console.log("File Data After Append --", data);
    // console.log("path:", System.IO.Path.GetFilename(event.target.value));
    this.state.backendnProfName = event.target.value;
    this.state.backendnProfName = this.state.backendnProfName.replace(
      /C:\\fakepath\\/,
      ""
    );
    console.log("+++++++++++++++", this.state.backendnProfName);
    axios
      .post("http://localhost:3001/files", data)
      .then((response) => {
        console.log("profile pic upload response", data);
        this.setState({
          prof_pic: response.data,
        });
        let data2 = {
          prof_pic: this.state.backendnProfName,
          restaurantemail: localStorage.getItem("username"),
        };
        axios
          .post("http://localhost:3001/updateProfPicRest", data2)
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
      })
      .catch((error) => console.log("error " + error));
  };

  handleDishUpload = (event) => {
    let data = new FormData();
    console.log("File Data --", event.target.files[0]);
    data.append("file", event.target.files[0]);
    data.append("name", "dish_pic");
    console.log("File Data After Append --", data);
    // console.log("path:", System.IO.Path.GetFilename(event.target.value));
    this.state.backendnProfName = event.target.value;
    this.state.backendnProfName = this.state.backendnProfName.replace(
      /C:\\fakepath\\/,
      ""
    );
    console.log("+++++++++++++++", this.state.backendnProfName);
    axios
      .post("http://localhost:3001/files", data)
      .then((response) => {
        console.log("profile pic upload response", data);
        this.setState({
          dish_pic: response.data,
        });
        let data3 = {
          dish_pic: this.state.backendnProfName,
          restaurantemail: localStorage.getItem("username"),
        };
        axios
          .post("http://localhost:3001/updateDishPicRest", data3)
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
      })
      .catch((error) => console.log("error " + error));
  };

  componentDidMount() {
    this.setState({
      setShow: this.props.show,
      rest_name: this.props.data[0].name,
      location: this.props.data[0].location,
      des: this.props.data[0].description,
      timing: this.props.data[0].timing,
      contact: this.props.data[0].contact,
      website: this.props.data[0].website,
      email: this.props.data[0].email,
      id: this.props.data[0].restaurantID,
      reviews: this.props.data[0].reviews,
      prof_pic: this.props.data[0].prof_pic,
      dish_pic: this.props.data[0].dish_pic,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show,
      });
    }
    console.log("prof pic name", this.state.prof_pic);
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Restaurant Name"
                value={this.state.rest_name}
                onChange={this.restName}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Timing</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={this.state.timing}
                onChange={this.timing}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Contact Info </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Info"
                value={this.state.contact}
                onChange={this.contact}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                value={this.state.website}
                onChange={this.website}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.des}
                onChange={this.desc}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="prof_pic"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="dish_pic"
                type="file"
                onChange={this.handleDishUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default edit;
// <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//                 onChange={this.email}
//               />
//             </Form.Group>
