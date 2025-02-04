import React, { useState, useEffect } from 'react';
import EmployeeManager from './EmployeeManager';
import CourseManager from '../Courses-Components/CourseManager';
import Employees from './EmployeesClass';

const AddEmployee = ({ onEmployeeAdded }) => {
    const employeeManager = new EmployeeManager();
    const courseManager = new CourseManager();

    const [formData, setFormData] = useState({
        Id: '',
        Name: '',
        Age: '',
        Salary: '',
        CourseList: [],
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(courseManager.getCourses());
    }, [courseManager]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCourseChange = (e) => {
        const { options } = e.target;
        const selectedCourses = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData((prevData) => ({
            ...prevData,
            CourseList: selectedCourses,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const addedEmployee = employeeManager.addEmployee(new Employees(
            formData.Id,
            formData.Name,
            formData.Age,
            formData.Salary,
            formData.CourseList
        ));

        if (addedEmployee) {
            onEmployeeAdded(addedEmployee);
            setFormData({ Id: '', Name: '', Age: '', Salary: '', CourseList: [] }); 
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        type="text"
                        name="Id"
                        className="form-control"
                        value={formData.Id}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="Name"
                        className="form-control"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="Age"
                        className="form-control"
                        value={formData.Age}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input
                        type="number"
                        name="Salary"
                        className="form-control"
                        value={formData.Salary}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Select Courses</label>
                    <select
                        multiple
                        className="form-control"
                        onChange={handleCourseChange}
                    >
                        {courses.map((course) => (
                            <option key={course.Id} value={course.Id}>
                                {course.CourseName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
