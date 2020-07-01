import React, { Component } from 'react';
import Axios from 'axios'
import validator from 'validator';
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import Layout from '../components/Layout/Layout';
import { signup } from '../actions/signup';
import ErrorSuccess from '../components/ErrorSuccess/ErrorSuccess';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            useremail: '',
            userpassword: '',
            Error: '',
            Success: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, useremail, userpassword } = this.state;
        console.log("Details", username, useremail, userpassword);
        if (validator.isEmail(useremail) && validator.isAlphanumeric(username)) {
            const user = {
                name: username,
                email: useremail,
                password: userpassword
            }
            try {
                const data = await signup(user);                                                         
                    this.setState({
                        username: '',
                        useremail: '',
                        userpassword: '',                       
                        Success:'Successfully Sign Up.',
                        Error: '',
                    })                                      
                    Router.push('/question')                
            }
            catch (error) {
                this.setState({
                    Error: "Please Enter Valid Username or Email",
                    Success:''
                })                              
            }     
        }
        else {
            this.setState({
                Error: "Please Enter Username or Email",
                Success:''
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
                          <Input type="text" name="username" value={this.state.username} className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
                          <label>Email Address</label>
                          <Input type="email" name="useremail" value={this.state.useremail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                          <label>Password</label>
                          <Input type="password" name="userpassword" value={this.state.userpassword} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                          <Button block className="btn-round mb-2" color="default" onClick={this.handleSubmit}>Sign Up</Button>
                        </Form>  
                        {/* {
                        this.state.Success ? <div className="alert-with-icon alert alert-success fade show" role="alert">
                                                    <div class="container">
                                                        <div class="alert-wrapper">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                {/* <i class="nc-icon nc-simple-remove"></i> 
                                                            </button>
                                                            <div class="message">
                                                                {/* <i class="nc-icon nc-bell-55"></i>  
                                                                    {this.state.Success}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : null
                        }
                        {
                        this.state.Error ? <div className="alert-with-icon alert alert-danger fade show" role="alert">
                                                    <div class="container">
                                                        <div class="alert-wrapper">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                {/* <i class="nc-icon nc-simple-remove"></i> 
                                                            </button>
                                                            <div class="message">
                                                                {/* <i class="nc-icon nc-bell-55"></i>  
                                                                    {this.state.Error}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : null
                        }                       */}
                        <ErrorSuccess Error={this.state.Error} Success={this.state.Success}/>
                      </Card>
                    </Col>
                  </Row>
                  
                </Container>                
                </div>
                
                    {/* <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="username" value={this.state.username} className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="useremail" value={this.state.useremail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="userpassword" value={this.state.userpassword} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button> */}
                    {/* {
                        this.state.statusSuccess ? <div className="alert alert-success mt-3" role="alert">
                            {this.state.statusSuccess}
                        </div> : null
                    }
                     */}
                
                </Layout>
        );
    }
}

export default Signup;