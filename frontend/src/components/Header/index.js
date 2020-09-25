import React from "react";
import './index.css'
const Header = ({history}) => {
  return <div className="header">
      <div className="navigation">
          <ul>
              <li>Home</li>
              <li>Tarefas</li>
              <li>Logout</li>

          </ul>

      </div>
  </div>;
};

export default Header;