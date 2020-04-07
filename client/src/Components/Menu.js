import React, { Component } from "react";
import "../Css/Menu.css";
import X from "../images/x.png"

class Menu extends Component {
  render() {
    let visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <div id= "close-menu" onClick={this.props.closeMenu}><img id ="X"src ={X}/></div>
       
        <div id = "menu-list">
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">About</a></h2>
        <h2><a href="#">Contact</a></h2>
        <h2><a href="#">Search</a></h2>
        <h2><a href="#">Search</a></h2>
        </div>
        {this.props.user ? <div id="sign-out-button" onClick={this.props.logOut} onMouseUp={this.props.closeMenu}>Sign Out</div> : null}
      </div>
    );
  }
}

export default Menu;