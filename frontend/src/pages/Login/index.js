import React from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Login = ({history})=>{
    console.log('Login');



    return(<div className="login-container container">
           <div className="login-content">
               <img src={logo} className="login-logo"></img>
               <form>
                   <input placeholder="Digite seu e-mail" className="login-field"></input>
                   <input placeholder="Digite sua senha"className="login-field"></input>
                  <button className="login-button">Login</button>
               </form>
               <button className="login-button">Registrar</button>

           </div>
    </div>)
}
export default Login;