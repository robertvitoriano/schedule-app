import React from 'react';
import Header from '../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Login = ({history})=>{
    console.log('Login');



    return(<div className="signup-container container">
           <div className="signup-content">
               <img src={logo} className="signup-logo"></img>
               <form>
                   <input placeholder="Digite seu e-mail" className="signup-field"></input>
                   <input placeholder="Digite sua senha"className="signup-field"></input>
                   <button className="signup-button" onClick={e=>history.push('/home')}>Registrar</button>
               </form>

           </div>
    </div>)
}
export default Login;