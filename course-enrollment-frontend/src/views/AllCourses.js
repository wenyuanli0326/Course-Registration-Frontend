import * as React from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../service/CourseService";

export default class AllCourses extends React.Component {
    state = {
        courses: []
    }
    componentDidMount() {
        CourseService.getAllCourses().then(response => {
            //succeed
            this.setState({
                courses: response.data 
            })
        }).catch(error => {
            //failed 
            console.log(error)
        })
    }

    enrollCourse(courseName) {
        CourseService.enrollCourse(courseName).then(response => {
            alert(`${courseName} enrolled successfully!`)
        }).catch(error => {
            alert(`${courseName} enrolled failed due to ${error}!`)
        })
    }


    render() {
        return (
            <div>
                <h1>This is the list of all courses.</h1>
                <CourseTable courses = {this.state.courses}
                            buttonLabel = {"enroll"}
                            buttonColor = {"success"}
                            handleButtonClick={this.enrollCourse} />
            </div>
        )
    }
}