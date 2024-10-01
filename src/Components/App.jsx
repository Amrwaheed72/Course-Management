import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoursesPage from './Courses-Components/Courses-Page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesPage from './Employees-Components/EmployeesPage';
import NavBar from './Tasks/NavBar';
import HomePage from './Tasks/HomePage';

const App = () => {


    return (
        <BrowserRouter><div className="container">
            <h1 className="mt-4">Employee Management</h1>
            <NavBar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
            </Routes>
        </div></BrowserRouter>
    );
};

export default App;