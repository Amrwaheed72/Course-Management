import React, { useState, useEffect } from 'react';
import AddEmployee from './AddEmployee';
import EmployeeTable from './EmployeeTable';
import EmployeeManager from './EmployeeManager';
import './EmployeesPage.css';

function EmployeesPage() {
    const employeeManager = new EmployeeManager();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setEmployees(employeeManager.getEmployees());
    }, [employeeManager]);

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    const handleEmployeeDeleted = (id) => {
        employeeManager.deleteEmployee(id);
        setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.Id !== id)); 
    };

    const handleEmployeeUpdated = (id, updatedData) => {
        employeeManager.updateEmployee(id, updatedData); 
        setEmployees((prevEmployees) =>
            prevEmployees.map(emp => (emp.Id === id ? { ...emp, ...updatedData } : emp))
        );
    };

    return (
        <div className="employees-page-container">
            <h2 className="page-title">Manage Employees</h2>
            <div className="employees-content">
                <div className="form-section">
                    <AddEmployee onEmployeeAdded={handleEmployeeAdded} />
                </div>
                <div className="table-section">
                    <EmployeeTable
                        employees={employees}
                        onEmployeeDeleted={handleEmployeeDeleted}
                        onEmployeeUpdated={handleEmployeeUpdated}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmployeesPage;
