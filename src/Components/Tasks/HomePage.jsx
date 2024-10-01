import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Website!</h1>
            <p className="home-subtitle">Manage your courses and employees efficiently.</p>
            <p className="make-sure">Please make sure to add your Courses first before adding Employees!</p>
        </div>
    );
}

export default HomePage;
