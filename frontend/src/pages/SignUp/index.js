import React,{useState} from 'react';
import api from './../../services/api'
import Header from '../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Login = ({history})=>{
    const[email,setEmail] = useState('');
    const[password,setPassord] = useState('');
    const[name,setName] = useState('');

   async  function handleRegister(e){
        e.preventDefault();
        const response = await api.post('/users',{
            email:email,
            password:password,
            name:name
        });
        console.log(response.data.user);
        localStorage.setItem('token',response.data.token);
        history.push('/home');
    }
 
    return(<div className="signup-container container">
           <div className="signup-content">
               <img src={logo} className="signup-logo"></img>
               <form >
               <input placeholder="Digite seu nome"className="signup-field" value={name} onChange={e=>setName(e.target.value)}></input>
                <input placeholder="Digite seu e-mail" className="signup-field" value={email} onChange={e=>setEmail(e.target.value)}></input>
                <input placeholder="Digite sua senha"className="signup-field" value={password} onChange={e=>setPassord(e.target.value)}></input>
                <button className="signup-button" onClick={e=>  handleRegister(e)}>Registrar</button>
               </form>

           </div>
    </div>)
}
export default Login;