import React, { Component } from 'react';
import Axios from 'axios'
import validator from 'validator';
import Router from 'next/router'
import Layout from '../components/Layout/Layout';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            Error: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (validator.isEmail(email) &&
            !validator.isEmpty(email) &&
            !validator.isEmpty(password)) {
            const user = {
                email,
                password
            }
            Axios.post('http://localhost:3000/api/v1/user/login', user)
                .then(response => {
                    console.log(response.data)
                    Router.push('/question')
                    window.localStorage.setItem('login',JSON.stringify(response.data));                    
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        Error: "Please Enter Valid Email and Password."
                    })
                })
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
                <div className="col-md-8 mx-auto">
                    <h1 className="text-center">Login Page</h1>
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
                        {
                            this.state.Error ? <div className="alert alert-danger mt-3" role="alert">
                                {this.state.Error}
                            </div> : null
                        }
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Login;