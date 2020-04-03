import React, { Component } from "react";
import '../Css/MenuButton.css';
 
class MenuButton extends Component {
  render() {
    return (
      <button id="roundButton"
      /*Button*/ 
              onMouseDown={this.props.handleMouseDown}>Menu</button>

    );
  }
}
 
export default MenuButton