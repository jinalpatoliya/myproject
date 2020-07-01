import React, { Component } from 'react';
import validator from 'validator';
import Router from 'next/router'
import { login } from '../actions/login';
import { Cookies } from 'react-cookie';
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import Layout from '../components/Layout/Layout';
import ErrorSuccess from '../components/ErrorSuccess/ErrorSuccess';
// set up cookies
const cookies = new Cookies();


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            Error: '',
            token: cookies.get('token') || null,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (validator.isEmail(email) &&
            !validator.isEmpty(email) &&
            !validator.isEmpty(password)) {
            const user = {
                email,
                password
            }
            try {
                const data = await login(user);
                if (data) {  
                    // const token = response.data.token;
                                    
                    cookies.set('token',data.token);
                    
                    this.setState({
                      token: data
                    })                                      
                    Router.push('/question')
                }
            }
            catch (error) {
                this.setState({
                    Error:"Please Enter Valid Email & Password."
                })                              
            }           
        }
        else {
            this.setState({
                Error: "Please Enter Email and Password."
            })
        }
    }
    render() {
        return (
            <Layout>
                 <div
                    className="page-header"
                    style={{
                      backgroundImage:
                      "url(" + require("../public/img/login-image.jpg") + ")"
                    }}
                  >
                    <div className="filter" />
                    <Container>
                      <Row>
                        <Col className="ml-auto mr-auto" lg="4">
                          <Card className="card-register ml-auto mr-auto">
                            <h3 className="title mx-auto">Welcome</h3>                                        
                            {/* <div className="social-line text-center">
                              <Button
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
                              </Button>
                            </div> */}
                            <Form className="register-form">
                              <label>Email Address</label>
                              <Input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
                              <label>Password</label>
                              <Input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                              <Button block className="btn-round mb-3" color="default" onClick={this.handleSubmit}>                    Login
                              </Button>
                            </Form>      
                            <ErrorSuccess Error={this.state.Error}/>
                        {/* {
                        this.state.Error ? <div className="alert-with-icon alert alert-danger fade show" role="alert">
                                                    <div class="container">
                                                        <div class="alert-wrapper">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                {/* <i class="fas fa-window-close"></i> */}
                                                            {/* </button> 
                                                            <div class="message">
                                                                {/* <i class="fas fa-bell"></i>  */}
                                                                    {/* {this.state.Error} 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : null
                        }      */}
                            {/* <div className="forgot">
                              <Button
                                className="btn-link"
                                color="danger"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                  
                                Forgot password?
                              </Button>
                            </div> */}
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                    </div>
                {/* <div className="col-md-8 mx-auto">
                    <h1 className="text-center">Login Page</h1>
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
                        {
                            this.state.Error ? <div className="alert alert-danger mt-3" role="alert">
                                {this.state.Error}
                            </div> : null
                        }
                    </form>
                </div> */}
            </Layout>
        );
    }
}

export default Login;