import React, { Component } from "react";
import "../Css/Menu.css";
import X from "../images/x.png"
import { Link } from 'react-router-dom'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //percentage: 20
    }
  }
  render() {
    let visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <div id="close-menu" onClick={this.props.closeMenu}>
          <img id="X" src={X} alt="close X" />
        </div>

        <div id="menu-list">

          <Link to='/' style={{ textDecoration: 'none' }}>
            <h2>Home</h2>
          </Link>

          {this.props.user ?
            <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
              <h2>Dashboard</h2>
            </Link>
            : null}

          <Link to={'/Contact'} style={{ textDecoration: 'none', color: 'black' }}>
            <h2>Contact</h2>
          </Link>
         
           {!this.props.user ?
            <Link id='sign-up-menu' style={{ textDecoration: 'none', color: 'black' }} to={'/login'}>
              <h2>Login</h2>
            </Link>
            : null }

            {!this.props.user ?
            <Link id='sign-up-menu' style={{ textDecoration: 'none', color: 'black' }} to={'/signup'}>
              <h2>Sign Up</h2>
            </Link>
            : null}

          {this.props.user ?
            <Link to='/' id="sign-out-button" onClick={this.props.logOut} onMouseUp={this.props.closeMenu} style={{ textDecoration: 'none', color: 'black', whiteSpace: "nowrap" }}>
              <h2>Sign Out</h2>
            </Link>
            : null}

          {this.props.admin ?
            <Link to='/admin' style={{ textDecoration: 'none', color: 'black' }}>
              <h2>Admin</h2>
            </Link>
            : null}
        </div>

      </div>
    );
  }
}

export default Menu;