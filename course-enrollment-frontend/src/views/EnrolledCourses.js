import React from "react";
import {CourseService} from "../service/CourseService";
import CourseTable from "../components/CourseTable";

export default function EnrolledCourses() {
    const [courses, setCourses] = React.useState([]);
    React.useEffect(getEnrolledCourses, []);

    function getEnrolledCourses() {
        CourseService.getStudentCourses().then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.error((error));
        })
    }

    function dropCourse(courseName) {
        CourseService.dropCourse(courseName).then(response => {
            alert(`${courseName} dropped successfully`);
            getEnrolledCourses();
        }).catch(error => {
            console.error(error);
            alert(`${courseName} dropped failed due to ${error}`);
        })
    }


    return (
        <div>
            <h1>This is the list of courses you enrolled.</h1>
            <CourseTable courses = {courses}
                         buttonLabel = {"drop"}
                         buttonColor = {"error"}
                         handleButtonClick={dropCourse} />
        </div>
    )
}




/*
export default class EnrolledCourses extends React.Component {
    state = {
        courses: []
    }
    componentDidMount() {
        CourseService.getStudentCourses().then(response => {
            //succeed
            this.setState({
                courses: response.data
            })
        }).catch(error => {
            //failed
            console.log(error)
        })
    }

    dropCourse(courseName) {
        CourseService.dropCourse(courseName).then(response => {
            window.location.reload()
            alert(`${courseName} dropped successfully!`)

        }).catch(error => {
            alert(`${courseName} dropped failed due to ${error}!`)
        })
    }


    render() {
        return (
            <div>
                <h1>This is AllCourses.</h1>
                <CourseTable courses = {this.state.courses}
                             buttonLabel = {"drop"}
                             buttonColor = {"error"}
                             handleButtonClick={this.dropCourse} />
            </div>
        )
    }
} */