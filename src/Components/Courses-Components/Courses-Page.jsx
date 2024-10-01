import React, { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import CourseTable from './CourseTable';
import CourseManager from './CourseManager';
import './CoursesPage.css';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const courseManager = new CourseManager();

    useEffect(() => {
        const fetchedCourses = courseManager.getCourses();
        setCourses(fetchedCourses);

    }, [courseManager]);

    const handleCourseAdded = (newCourse) => {
        courseManager.addCourse(newCourse);
        setCourses(courseManager.getCourses());
    };

    const handleCourseUpdated = (updatedCourse) => {
        courseManager.updateCourse(updatedCourse.Id, updatedCourse);
        setCourses(courseManager.getCourses());
    };

    const handleCourseDeleted = (courseId) => {
        courseManager.removeCourse(courseId);
        setCourses(courseManager.getCourses());
    };
    
    return (
        <div className="courses-page-container">
            <h2 className="page-title">Manage Courses</h2>
            <div className="courses-content">
                <AddCourse onCourseAdded={handleCourseAdded} />
                <CourseTable
                    courses={courses}
                    onUpdateCourse={handleCourseUpdated}
                    onDeleteCourse={handleCourseDeleted}
                />
            </div>
        </div>
    );
}

export default CoursesPage;
