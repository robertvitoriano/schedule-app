import React from "react";
import './index.css'
import logo from './../../assets/logo-agx-software.png';
import { Link } from 'react-router-dom';
const Header = ({history}) => {
  return <div className="header">
      <img src={logo} className='header-logo' onClick={e=>history.push('/home')}></img>    
      <div className="navigation">
          <ul className="navigation-items">
              <li className="navigation-item"><Link to="/home" >Home</Link></li>
              <li className="navigation-item"><Link to="/tasks">Gerenciar Tarefas</Link></li>
              <li className="navigation-item"><Link to="/">Logout</Link></li>

          </ul>

      </div>
  </div>;
};

export default Header;