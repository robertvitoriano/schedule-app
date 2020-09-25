import React from 'react';
import Header from './../../components/Header'

const Home = ({history})=>{

   
    return(<div className="home-container container">
        <Header history={history}></Header>
        <h1>Home</h1>
    </div>)
}

export default Home;