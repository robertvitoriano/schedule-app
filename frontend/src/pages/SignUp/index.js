import React from 'react';
import Header from './../../components/Header'

const SignUp = ({history})=>{
    console.log('Sign Up');

   
    return(<div className="sign-up-container container">
        <Header history={history}></Header>
        <h1>SignUp</h1>
    </div>)
}

export default SignUp;