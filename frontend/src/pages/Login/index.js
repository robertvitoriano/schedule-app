import React from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';


import './index.css'
 const Login = ({history})=>{
    console.log('Login');

    function handleLogin(e){
        e.preventDefault();
        history.push('/home')
    }
 


    return(<div className="register-container container">
           <div className="register-content">
               <img src={logo} className="register-logo"></img>
               <form onSubmit={e=>handleLogin(e)}>
                   <input placeholder="Digite seu e-mail" className="register-field"></input>
                   <input placeholder="Digite sua senha"className="register-field"></input>
                  <button className="register-button">Login</button>
               </form>
               <button className="register-button" onClick={e=>history.push('/signup')}>Registrar</button>

           </div>
    </div>)
}
export default Login;