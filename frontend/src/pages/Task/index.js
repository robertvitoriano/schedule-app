import React from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Tasks = ({history})=>{
    console.log('Home');

    return(<div className="login-container container">
        <Header history={history}></Header>
        <h1>Tasks</h1>
 
    </div>)
}
export default Tasks;