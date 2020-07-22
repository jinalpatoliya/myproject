import validator from "validator";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout/Layout";
import { signup } from "../actions/signup";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";
import { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      useremail: "",
      userpassword: "",
      Error: "",
      Success: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, useremail, userpassword } = this.state;
    if (validator.isEmail(useremail) && validator.isAlphanumeric(username)) {
      const user = {
        name: username,
        email: useremail,
        password: userpassword,
      };
      try {
        const data = await signup(user);
        if(data){
          this.setState({
            username: "",
            useremail: "",
            userpassword: "",
            Success: "Please visit your email address and active your account",
            Error: "",
          });
        }
      } catch (error) {
        this.setState({
          Error: error.data.msg,
          Success: "",
        });
        return;
      }
    } else {
      this.setState({
        Error: "Please Enter Username or Email",
        Success: "",
      });
    }
  };
  render() {
    return (
      <Layout>
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("../public/img/login-image.jpg") + ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome</h3>
                  <div className="social-line text-center">
                    {/* <Button
                            className="btn-neutral btn-just-icon mr-1"
                            color="facebook"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fa fa-facebook-square" />
                          </Button>
                          <Button
                            className="btn-neutral btn-just-icon mr-1"
                            color="google"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fa fa-google-plus" />
                          </Button>
                          <Button
                            className="btn-neutral btn-just-icon"
                            color="twitter"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fa fa-twitter" />
                          </Button> */}
                  </div>
                  <Form className="register-form">
                    <label>Name</label>
                    <Input
                      type="text"
                      name="username"
                      value={this.state.username}
                      placeholder="Enter Name"
                      onChange={this.handleChange}
                    />
                    <label>Email Address</label>
                    <Input
                      type="email"
                      name="useremail"
                      value={this.state.useremail}
                      placeholder="Enter Email"
                      onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <Input
                      type="password"
                      name="userpassword"
                      value={this.state.userpassword}
                      placeholder="Password"
                      onChange={this.handleChange}
                      autoComplete="on"
                    />
                    <Button
                      block
                      className="btn-round mb-2"
                      color="default"
                      onClick={this.handleSubmit}
                    >
                      Sign Up
                    </Button>
                  </Form>
                  <ErrorSuccess
                    Error={this.state.Error}
                    Success={this.state.Success}
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Signup;