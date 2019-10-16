import React from "react";
import "./App.css";
import Course from "./Course";
// import PreviousCourseArea from './PreviousCourseArea';

class RecommendSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCourseNames: {}
    };
  }

  componentDidMount = () => {
    fetch(
      "https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed"
    )
      .then(res => res.json())
      .then(data => this.setState({ previousCourseNames: data }));
  };

  getCourses = () => {
    let courses = [];

    for (const course of Object.entries(this.props.courses)) {
      for (const prevName of Object.values(
        this.state.previousCourseNames.data
      )) {
        if (course[0] === prevName) {
          courses.push(<Course key={course[0]} data={course[1]} />);
        }
      }
    }

    return courses;
  };

  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default RecommendSidebar;
