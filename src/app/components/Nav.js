import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark"> 
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Ventas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/consulta'>Consulta</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;