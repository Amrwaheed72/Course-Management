import React, { useState } from 'react';
import CourseManager from '../Courses-Components/CourseManager';
import './EmployeeTable.css'; // Include this file for table styling

const EmployeeTable = ({ employees, onEmployeeDeleted, onEmployeeUpdated }) => {
    const courseManager = new CourseManager();
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [ageFilter, setAgeFilter] = useState('');
    const [sortBySalary, setSortBySalary] = useState(false);

    const filteredEmployees = employees.filter(employee => {
        if (ageFilter) {
            return employee.Age <= Number(ageFilter);
        }
        return true;
    });

    const sortedEmployees = sortBySalary
        ? filteredEmployees.sort((a, b) => b.Salary - a.Salary)
        : filteredEmployees;

    const handleDelete = (id) => {
        onEmployeeDeleted(id); 
    };

    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.Id);
        setEditFormData(employee);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        onEmployeeUpdated(editingEmployeeId, editFormData);
        setEditingEmployeeId(null);
    };

    const getCourseNames = (courseIds) => {
        return courseIds.map(id => {
            const course = courseManager.getCourses().find(course => course.Id === id);
            return course ? course.CourseName : 'Unknown Course';
        }).join(', ');
    };

    return (
        <div className="employee-table-container">
            <h2 className="mb-4">Employee List</h2>

            <div className="mb-3">
                <label>Filter by Age:</label>
                <input
                    type="number"
                    className="form-control"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    placeholder="Enter age"
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={sortBySalary}
                    onChange={(e) => setSortBySalary(e.target.checked)}
                />
                <label className="form-check-label">Sort by Salary</label>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Courses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.map(employee => (
                        <tr key={employee.Id}>
                            <td>{employee.Id}</td>
                            <td>
                                {editingEmployeeId === employee.Id ? (
                                    <input
                                        type="text"
                                        name="Name"
                                        value={editFormData.Name}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                ) : (
                                    employee.Name
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.Id ? (
                                    <input
                                        type="number"
                                        name="Age"
                                        value={editFormData.Age}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                ) : (
                                    employee.Age
                                )}
                            </td>
                            <td>
                                {editingEmployeeId === employee.Id ? (
                                    <input
                                        type="number"
                                        name="Salary"
                                        value={editFormData.Salary}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                ) : (
                                    employee.Salary
                                )}
                            </td>
                            <td>{getCourseNames(employee.CourseList)}</td>
                            <td>
                                {editingEmployeeId === employee.Id ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleUpdateSubmit}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditClick(employee)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(employee.Id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
