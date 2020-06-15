import React, { Component } from 'react';
import validator from 'validator';
import Router from 'next/router'
import Layout from '../components/Layout/Layout';
import { login } from '../actions/login';
import jsCookie from 'js-cookie';
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
                    jsCookie.set("screenname", data)
                    Router.push('/question')
                }
            }
            catch (error) {
                this.setState({
                    Error: error.data.message
                })
                // console.log(typeof error)
                // console.log("Login Eror", error.data.message)                
            }
            //    else{
            //        this.setState({
            //            Error:data.message
            //        })
            //    }
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
                </div>
            </Layout>
        );
    }
}

export default Login;