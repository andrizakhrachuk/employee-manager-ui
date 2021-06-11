import React, {useState} from 'react';
import {Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem, Collapse, Nav} from 'reactstrap';

export const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHandler = () => {
        setIsOpen(true);
    }

    return (<Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Nav.Link} to="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggleHandler}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink
                        href="https://twitter.com/oktadev">@oktadev</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">GitHub</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>);
};

export default AppNavbar;