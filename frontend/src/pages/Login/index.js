import React from 'react';
import Header from './../../components/Header'


 const Login = ({history})=>{


    return(<div className="login-container container">
        <Header history={history}></Header>
        <h1>Login</h1>
    </div>)
}
export default Login;