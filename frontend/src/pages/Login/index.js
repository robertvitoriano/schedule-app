import React from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Login = ({history})=>{
    console.log('Login');



    return(<div className="login-container container">
        <img className="login-logo" src={logo}></img>
    </div>)
}
export default Login;