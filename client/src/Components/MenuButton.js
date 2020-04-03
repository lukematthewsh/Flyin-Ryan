import React, { Component } from "react";
import '../Css/MenuButton.css';
 
class MenuButton extends Component {
  render() {
    return (
      <div id="menu-button" onMouseDown={this.props.handleMouseDown}>Menu</div>

    );
  }
}
 
export default MenuButton