import React, { Component } from "react";
import '../Css/MenuButton.css';
import menuBars from '../images/menuico.png' 

class MenuButton extends Component {
  render() {
    return (
      <div id="menu-button" onMouseDown={this.props.handleMouseDown}><img id = 'menubars' src = {menuBars}/></div>

    );
  }
}
 
export default MenuButton