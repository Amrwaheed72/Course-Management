import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
    return (
        <header className="navbar-container">
            <nav className="navbar-content">
                <Link className="navbar-logo" to="/">Home Page</Link>
                <div className="navbar-links">
                    <Link className="navbar-link" to="/courses">Courses</Link>
                    <Link className="navbar-link" to="/employees">Employees</Link>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
