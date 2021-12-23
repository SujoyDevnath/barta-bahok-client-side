// import { Button, Container } from '@mui/material';
import { Avatar } from '@mui/material';
import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const user = useSelector((state) => state?.firebaseReducer?.firebase);
    const {displayName, photoURL} = user;
    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" bg="white" variant="white" className='navbar'>
            <Container>
                <Navbar.Brand className="navbar-brand fs-2">Barta Bahok</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} activeClassName="header-btn" to="/home" className="fs-5 text-dark">Home</Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="header-btn" to="/posts" className="fs-5 text-dark">Posts</Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="header-btn" to="/people" className="fs-5 text-dark">People</Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="header-btn" to="/chats" className="fs-5 text-dark">Chats</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/profile">
                            <Avatar
                                alt={displayName}
                                src={photoURL}
                                sx={{ width: 56, height: 56, ml: 3 }}
                            />
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;