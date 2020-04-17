import React, { Component } from "react";
import "../Css/Menu.css";
import X from "../images/x.png"
import { Link } from 'react-router-dom'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 20
    }
  }
  render() {
    let visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <div id="close-menu" onClick={this.props.closeMenu}><img id="X" src={X} /></div>

        <div id="menu-list">
          <Link to = '/' style={{ textDecoration: 'none' }}><h2><a>Home</a></h2> </Link>
          {this.props.user ? <Link to = '/dashboard' style={{ textDecoration: 'none' }}><h2><a>Dashboard</a></h2> </Link> : null}
          <h2><a href="https://flyinryanhawks.org/event-directory/">Events</a></h2>
          <h2><a href="https://flyinryanhawks.org/contact/">Contact</a></h2>
          {this.props.user ? <Link to='/' id="sign-out-button" onClick={this.props.logOut} onMouseUp={this.props.closeMenu} style={{ textDecoration: 'none', color: 'black' }} ><h2><a>Sign Out</a></h2></Link> : null}
          {this.props.admin ? <Link to = '/admin' style={{ textDecoration: 'none' }}>Admin</Link> : null}
        </div>
        
      </div>
    );
  }
}

export default Menu;