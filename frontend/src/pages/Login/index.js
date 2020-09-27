import React,{useState} from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';
import api from './../../services/api'


import './index.css'
 const Login = ({history})=>{
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');


  async  function handleLogin(e){
        e.preventDefault();
        const response = await api.post('/users/login',{
            email:email,
            password:password
        });
        localStorage.setItem('name',response.data.user.name);
        localStorage.setItem('token',response.data.token);
         history.push('/home');
    }
 


    return(<div className="register-container container">
           <div className="register-content">
               <img src={logo} className="register-logo"></img>
               <form onSubmit={e=>handleLogin(e)}>
                   <input placeholder="Digite seu e-mail" className="register-field" value={email}
                   onChange={e=>{
                       setEmail(e.target.value)
                   }}></input>
                   <input placeholder="Digite sua senha"className="register-field" value={password} onChange={e=>setPassword(e.target.value)}></input>
                  <button className="register-button">Login</button>
               </form>
               <button className="register-button" onClick={e=>history.push('/signup')}>Registrar</button>

           </div>
    </div>)
}
export default Login;