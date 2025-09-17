import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from './auth/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [logoutMessage, setLogoutMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
        return () => unsubscribe();
    }, []);

    return (
        <>
        {logoutMessage && (
            <Alert variant="success" className="text-center mb-0">
            {logoutMessage}
            </Alert>
        )}
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="w-100">
            <Container fluid>
            <Navbar.Brand as={Link} to="/">🏁 RaceHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="racehub-navbar" />
            <Navbar.Collapse id="racehub-navbar">
                <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/register">Event Registration</Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
                <Nav.Link as={Link} to="/discussion">Discussion</Nav.Link>
                {user ? (
                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                ) : (
                    <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}
