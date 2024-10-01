
import React, { useState } from 'react';
import CourseList from '../Data/CourseList';
const CourseTable = ({ courses, onUpdateCourse, onDeleteCourse }) => {
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleEditClick = (course) => {
        setEditingCourseId(course.Id);
        setEditFormData(course); 
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
        onUpdateCourse(editFormData);
        setEditingCourseId(null); 
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Course List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Duration</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.Id}>
                            <td>{course.Id}</td>
                            <td>
                                {editingCourseId === course.Id ? (
                                    <input
                                        type="text"
                                        name="CourseName"
                                        value={editFormData.CourseName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    course.CourseName
                                )}
                            </td>
                            <td>
                                {editingCourseId === course.Id ? (
                                    <input
                                        type="text"
                                        name="Duration"
                                        value={editFormData.Duration}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    course.Duration
                                )}
                            </td>
                            <td>
                                {editingCourseId === course.Id ? (
                                    <input
                                        type="date"
                                        name="StartDate"
                                        value={editFormData.StartDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    course.StartDate
                                )}
                            </td>
                            <td>
                                {editingCourseId === course.Id ? (
                                    <input
                                        type="date"
                                        name="EndDate"
                                        value={editFormData.EndDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    course.EndDate
                                )}
                            </td>
                            <td>
                                {editingCourseId === course.Id ? (
                                    <button className="btn btn-success btn-sm" onClick={handleUpdateSubmit}>
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditClick(course)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => onDeleteCourse(course.Id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;


// import CourseList from '../Data/CourseList';

// class CourseManager {
//     constructor() {
//         this.courses = [];
//     }

//     // Create a new course
//     addCourse(id, courseName, duration, startDate, endDate, teachingInstrList) {
//         const newCourse = new CourseList(id, courseName, duration, startDate, endDate, teachingInstrList);
//         this.courses.push(newCourse);
//         return newCourse;
//     }

//     // Read (find) course by ID
//     getCourseById(id) {
//         return this.courses.find(course => course.Id === id);
//     }

//     // Update course data by ID
//     updateCourse(id, updatedFields) {
//         const course = this.getCourseById(id);
//         if (course) {
//             Object.assign(course, updatedFields);
//             return course;
//         }
//         return null;
//     }

//     // Delete course by ID
//     deleteCourse(id) {
//         const courseIndex = this.courses.findIndex(course => course.Id === id);
//         if (courseIndex !== -1) {
//             this.courses.splice(courseIndex, 1);
//             return true;
//         }
//         return false;
//     }

//     // Get all courses
//     getAllCourses() {
//         return this.courses;
//     }
// }

// export default CourseManager;