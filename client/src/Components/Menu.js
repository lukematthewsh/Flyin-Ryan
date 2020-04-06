import React, { Component } from "react";
import "../Css/Menu.css";

class Menu extends Component {
  render() {
    let visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">About</a></h2>
        <h2><a href="#">Contact</a></h2>
        <h2><a href="#">Search</a></h2>
        <div id="close-menu-button" onClick={this.props.closeMenu}>Close Menu</div>
        {this.props.user ? <div id="sign-out-button" onClick={this.props.logOut} >Sign Out</div> : null}
      </div>
    );
  }
}

export default Menu;