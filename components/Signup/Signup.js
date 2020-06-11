import validator from 'validator';
import React, { Component } from 'react';
import Axios from 'axios'
import Router from 'next/router'

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            useremail: '',
            userpassword: '',
            statusError: '',
            statusSuccess: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, useremail, userpassword } = this.state;
        console.log("Details", username, useremail, userpassword);
        if (validator.isEmail(useremail) && validator.isAlphanumeric(username)) {
            const user = {
                name: username,
                email: useremail,
                password: userpassword
            }
            Axios.post('http://localhost:3000/api/v1/user/register', user)
                .then(response => {
                    console.log("data", response.data);
                    this.setState({
                        statusSuccess: "Successfully Signed up",
                        statusError: ''
                    })
                    //   Router.push('/login')
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            this.setState({
                statusError: "Please Enter Valid Username or Email"
            })
        }
    }
    render() {
        return (
            <div className="col-md-8 mx-auto">
                <h1 className="text-center">SignUp Page</h1>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="username" className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="useremail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="userpassword" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
                    {
                        this.state.statusSuccess ? <div className="alert alert-success mt-3" role="alert">
                            {this.state.statusSuccess}
                        </div> : null
                    }
                    {
                        this.state.statusError ? <div className="alert alert-danger mt-3" role="alert">
                            {this.state.statusError}
                        </div> : null
                    }
                </form>
            </div>
        );
    }
}

export default Signup;