import axios from "../axios"

export const CourseService = {
    getAllCourses: function() {
        return axios.get('/api/courses')
    },
    enrollCourse: (courseName) => {
        courseName = encodeURI(courseName);
        return axios.post(`/api/student/course/${courseName}`);
    },
    getStudentCourses:() => {
        return axios.get(`/api/student/courses`);
    },
    dropCourse:(courseName) => {
        courseName = encodeURI(courseName);
        return axios.delete(`/api/student/course/${courseName}`);
    }
}



