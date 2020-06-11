import React, { Component } from 'react';
import Layout from "../components/Layout/Layout";
import Signup from '../components/Signup/Signup';

class SignupPage extends Component {
    render() {
        return (
            <Layout>           
                 <Signup/>            
            </Layout>
                  );
    }
}

export default SignupPage