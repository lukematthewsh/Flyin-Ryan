import React, { Component } from 'react'
import FRFlogo from '../images/flyinLogo.svg'
import MenuButton from './MenuButton'
import Menu from './Menu'
import classnames from "classnames";

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true,
            isHidden: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    handleScroll = () => {
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };
    handleMouseDown(e) {
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }
    toggleMenu() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        return (
            <div className={classnames("nav-bar",{"navbar--hidden" : !this.state.visible})}>
                <img id="flyin-logo" src={FRFlogo} />
                <MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.isHidden} user={this.props.user} logOut={this.props.logOut} />
                <div>

                </div>
            </div>

        );
    }
}


export default Header