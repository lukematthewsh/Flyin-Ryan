import React, { Component } from 'react'
import FRFlogo from '../images/flyinLogo.svg'
import MenuButton from './MenuButton'
import Menu from './Menu'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: true,
            isHidden: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleMouseDown(e) {
        this.toggleMenu();

        e.stopPropagation();
    }
    toggleMenu() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
  
    render() {
        return (
            <div className="nav-bar">
                <Link to = "/"> <img id="flyin-logo" src={FRFlogo} alt = "flyin logo" /></Link>
                <MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu closeMenu={this.handleMouseDown}
                    menuVisibility={this.state.isHidden} user={this.props.user} logOut={this.props.logOut} admin={this.props.admin}/>
                <div>
                </div>
                <div id="rasta-border-menu"> </div>
            </div>

        );
    }
}


export default Header