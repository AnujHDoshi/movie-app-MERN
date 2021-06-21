import React from 'react';
import { Navbar, NavbarBrand,NavItem,NavLink,Nav,NavbarToggler} from 'reactstrap';

function Header() {
    return (
        <Navbar color="warning" light expand="md">
            <NavbarBrand href="/">Movie App</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href="../pages/MovieList">Add Movie</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default Header;
