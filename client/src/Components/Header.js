import React, { Component } from 'react'
import FRFlogo from '../images/flyinLogo.svg'
import MenuButton from './MenuButton'
import Menu from './Menu'

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    handleMouseDown(e) {
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }
    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }
    render() {
        return (
            <div id="nav-bar">
                <img id="flyin-logo" src={FRFlogo} />
                <MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible} />
                <div>

                </div>
            </div>

        );
    }
}


export default Header