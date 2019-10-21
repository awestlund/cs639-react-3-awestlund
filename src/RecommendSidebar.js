import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import PreviousCourse from "./PreviousCourse";
import Button from "react-bootstrap/Button";
// import PreviousCourseArea from './PreviousCourseArea';

class RecommendSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCourseNames: {}
    };
    this.keywords = React.createRef();
  }

  componentDidMount = () => {
    fetch(
      "https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed"
    )
      .then(res => res.json())
      .then(data => this.setState({ previousCourseNames: data }));
  };

  getKeywordOptions() {
    let keywordOptions = [];

    for(const keyword of this.props.subjects) {
      keywordOptions.push(<option key={keyword}>{keyword}</option>);
    }

    return keywordOptions;
  }

  getCourses = () => {
    let courses = [];
    for (const course of Object.entries(this.props.courses)) {
      for (const prevName of Object.values(
        this.state.previousCourseNames.data
      )) {
        if (course[0] === prevName) {
          courses.push(<PreviousCourse key={course[0]} data={course[1]} />);
        }
      }
    }

    return courses;
  };

  chooseKeyword(){
    return(
      <Form>
        <Form.Group style={{marginTop: "10px"}} controlId="formSubject">
          <Form.Label>Select Interesting Subjects</Form.Label>
          <Form.Control as="select" ref={this.keywords} onChange={() => this.setCourses()}>
            {this.getKeywordOptions()}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }

  render() {
    return (
      <>
        <Card style={{width: 'calc(30vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', alignContent: 'center', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Rate Your Courses!</Card.Title>
            <div style={{ margin: "5px" }}>{this.getCourses()}</div>
            <Button style={{marginTop: '5px'}}>Done Rating</Button>
          </Card.Body>
        </Card>
      </>
      );
  }
}

export default RecommendSidebar;
