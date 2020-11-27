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
      customerID: "",
      fname: "",
      pass: "",
      lname: "",
      email: "",
      dateofbirth: "",
      city: "",
      State: "",
      country: "",
      phonenumber: "",
      nickname: "",
      yelpingsince: "",
      thingsilove: "",
      about: "",
      findmein: "",
      myblog: "",
      file: null,
      backendnProfName: "",
    };
    // this.onFormSubmitPicture = this.onFormSubmitPicture.bind(this);
    // this.onChangePicture = this.onChangePicture.bind(this);
  }
  // onFormSubmitPicture(e) {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("myImage", this.state.file);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   axios
  //     .post("http://localhost:3001/upload", formData, config)
  //     .then((response) => {
  //       alert("The file is successfully uploaded");
  //     })
  //     .catch((error) => {});
  // }
  // onChangePicture(e) {
  //   this.setState({ file: e.target.files[0] });
  // }
  customerID = (e) => {
    this.setState({
      customerID: e.target.value,
    });
  };
  fnameevent = (e) => {
    this.setState({
      fname: e.target.value,
    });
  };

  lname = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };

  dateofbirth = (e) => {
    this.setState({
      dateofbirth: e.target.value,
    });
  };

  city = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  State = (e) => {
    this.setState({
      State: e.target.value,
    });
  };

  country = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  phonenumber = (e) => {
    this.setState({
      phonenumber: e.target.value,
    });
  };
  nickname = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };

  yelpingsince = (e) => {
    this.setState({
      yelpingsince: e.target.value,
    });
  };

  thingsilove = (e) => {
    this.setState({
      thingsilove: e.target.value,
    });
  };

  about = (e) => {
    this.setState({
      about: e.target.value,
    });
  };

  findmein = (e) => {
    this.setState({
      findmein: e.target.value,
    });
  };

  myblog = (e) => {
    this.setState({
      myblog: e.target.value,
    });
  };
  pass = (e) => {
    this.setState({
      pass: e.target.value,
    });
  };

  updatePers = (e) => {
    e.preventDefault();
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      dateofbirth: this.state.dateofbirth,
      city: this.state.city,
      State: this.state.State,
      country: this.state.country,
      phonenumber: this.state.phonenumber,
      nickname: this.state.nickname,
      yelpingsince: this.state.yelpingsince,
      thingsilove: this.state.thingsilove,
      about: this.state.about,
      findmein: this.state.findmein,
      myblog: this.state.myblog,
      email: this.state.email,
      pass: this.state.pass,
      customerID: this.state.customerID,
      prof_pic: this.state.prof_pic,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    //make a post request with the user data
    axios
      .post("http://localhost:3001/cust_profile/updatePersonal", data)
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
          customeremail: localStorage.getItem("username"),
        };
        // axios.defaults.headers.common["authorization"] = localStorage.getItem(
        //   "token"
        // );
        axios
          .post("http://localhost:3001/updateProfPic", data2)
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

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show,
      pass: this.props.data[0].pass,
      fname: this.props.data[0].fname,
      lname: this.props.data[0].lname,
      dateofbirth: this.props.data[0].dateofbirth,
      city: this.props.data[0].city,
      State: this.props.data[0].State,
      country: this.props.data[0].country,
      phonenumber: this.props.data[0].phonenumber,
      nickname: this.props.data[0].nickname,
      yelpingsince: this.props.data[0].yelpingsince,
      thingsilove: this.props.data[0].thingsilove,
      about: this.props.data[0].about,
      findmein: this.props.data[0].findmein,
      myblog: this.props.data[0].myblog,
      customerID: this.props.data[0].customerID,
      email: this.props.data[0].email,
      prof_pic: this.props.data[0].prof_pic,
    });

    console.log("prof pic name", this.state.prof_pic);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show,
      });
    }
  }

  render() {
    // console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form className="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={this.state.fname}
                onChange={this.fnameevent}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={this.state.lname}
                onChange={this.lname}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Nickname"
                value={this.state.nickname}
                onChange={this.nickname}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={this.state.pass}
                onChange={this.pass}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Contact Info </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Info"
                value={this.state.phonenumber}
                onChange={this.phonenumber}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={this.state.city}
                onChange={this.city}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={this.state.State}
                onChange={this.State}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyName">
              <Form.Label>First Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={this.state.country}
                onChange={this.country}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date of Birth"
                value={this.state.dateofbirth}
                onChange={this.dateofbirth}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Yelping Since</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Yelping since"
                value={this.state.yelpingsince}
                onChange={this.yelpingsince}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Things I Love</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Things I Love"
                value={this.state.thingsilove}
                onChange={this.thingsilove}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Find me in</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Find me in"
                value={this.state.findmein}
                onChange={this.findmein}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>My Blog</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter My Blog"
                value={this.state.myblog}
                onChange={this.myblog}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter About"
                value={this.state.about}
                onChange={this.about}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="prof_pic"
                type="file"
                onChange={this.handleFileUpload}
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

// <form onSubmit={this.onFormSubmitPicture}>
//             <h4>Profile Picture Upload</h4>
//             <input type="file" name="myImage" onChange={this.onChangePicture} />
//             <button type="submit">Upload</button>
//           </form>
