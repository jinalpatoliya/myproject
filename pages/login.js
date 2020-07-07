import React, { Component } from "react";
import validator from "validator";
import Router from "next/router";
import { login } from "../actions/login";
import { Cookies } from "react-cookie";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout/Layout";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      Error: "",
      token: cookies.get("token") || null,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (
      validator.isEmail(email) &&
      !validator.isEmpty(email) &&
      !validator.isEmpty(password)
    ) {
      const user = {
        email,
        password,
      };
      try {
        const data = await login(user);
        if (data) {
          cookies.set("token", data.token);
          this.setState({
            token: data,
          });
          Router.push("/question");
        }
      } catch (error) {
        this.setState({
          Error: "Please Enter Valid Email & Password.",
        });
      }
    } else {
      this.setState({
        Error: "Please Enter Email and Password.",
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
                  <Form className="register-form">
                    <label>Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                    <label>Password</label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                    <Button
                      block
                      className="btn-round mb-3"
                      color="default"
                      onClick={this.handleSubmit}
                    >
                      {" "}
                      Login
                    </Button>
                  </Form>
                  <ErrorSuccess Error={this.state.Error} />
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Login;
