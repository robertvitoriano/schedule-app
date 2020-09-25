import React from 'react';
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Home = ({history})=>{
    console.log('Home');



    return(<div className="login-container container">
        <Header history={history}></Header>
 
    </div>)
}
export default Home;