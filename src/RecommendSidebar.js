import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

class RecommendSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.prevCourses = [];
    this.state = {};
  }

  setPreviousCourses = () => {
    console.log(this.props.setPreviousCourses);
    this.props.setPreviousCourses(this.prevCourses);
  }

  filterPreviousCourses(courses, previousCourseNames) {
    let coursesTaken = [];
    for(const course of Object.entries(courses)) {
        for (const prevName of Object.values(previousCourseNames.data)){
            console.log(prevName);
            if(course[0] === prevName){
                console.log("here");
                coursesTaken.push(course);
            }
        }
    }
    return coursesTaken;
  }

//  componentDidUpdate() {
//   }

  render() {
    console.log("courses ");
    console.log(this.props.courses);
    console.log("prev course names ");
    console.log(this.props.previousCourseNames);
    this.prevCourses = this.filterPreviousCourses(this.props.courses, this.props.previousCourseNames);
    console.log(this.prevCourses);

    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Rate Your Courses!</Card.Title>
            <button onClick={this.setPreviousCourses}>get courses</button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default RecommendSidebar;