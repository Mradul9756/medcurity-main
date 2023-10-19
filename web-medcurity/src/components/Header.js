import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // Import from react-router-dom
import './Header.css';

function Header() {
  const location = useLocation(); // Get the current URL location
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Update the active tab based on the current URL
    const path = location.pathname;
    setActiveTab(path === '/' ? 'home' : path.substring(1));
  }, [location]);

  return (
    <>
      <Navbar expand="lg" sticky="top" className="custom-navbar">
        <Container className='parent-container'>
          <Navbar.Brand href="https://medcurity.com/">
            <img
              src="medcurity-logo-reversed-new.png"
              className="d-inline-block align-top"
              height="40"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav className="ml-auto" variant="tabs">
              <Nav.Item>
                <Nav.Link 
                  as={Link} // Use the Link component from react-router-dom
                  to="/" // Set the URL path
                  className={activeTab === 'home' ? 'active' : ''}
                  onClick={() => setActiveTab('home')}
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  as={Link} 
                  to="/news" 
                  className={activeTab === 'news' ? 'active' : ''}
                  onClick={() => setActiveTab('news')}
                >
                  News
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
