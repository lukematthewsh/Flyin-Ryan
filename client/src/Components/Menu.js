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
          <h2><a href="#">Home</a></h2>
          <h2><a href="#">About</a></h2>
          <h2><a href="#">Contact</a></h2>
          <h2><a href="#">Events</a></h2>
          {this.props.user ? <Link to='/' id="sign-out-button" onClick={this.props.logOut} onMouseUp={this.props.closeMenu}>Sign Out</Link> : null}
          
          
        </div>
        
      </div>
    );
  }
}

export default Menu;