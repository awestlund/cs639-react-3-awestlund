import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PreviousCourse from "./PreviousCourse";
import Button from "react-bootstrap/Button";
import CourseArea from "./CourseArea";
import Course from "./Course";
// import PreviousCourseArea from './PreviousCourseArea';

class RecommendSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCourseNames: {},
      coursesDisplay: [],
      likedCourses: [],
      dislikedCourses: [],
      displayKeywords: false,
      displayNewCourses: false,
      rateButton: true
    };
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleAgainClick = this.handleAgainClick.bind(this);
    this.subjects = React.createRef();
  }

  componentDidMount = () => {
    fetch(
      "https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed"
    )
      .then(res => res.json())
      .then(data => this.setState({ previousCourseNames: data }));
  };

  handleDoneClick(){
    //run recommend algo
    this.setState({displayKeywords: true});
    this.setState({displayNewCourses: true});
    this.setState({rateButton: false});
    // this.getDisplayCourses();
    var nodes = document.getElementById("rateCourses").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
         nodes[i].disabled = true;
    }
  }

  handleAgainClick(){
    this.setState({displayKeywords: false});
    this.setState({displayNewCourses: false});
    this.setState({rateButton: true});
    var nodes = document.getElementById("rateCourses").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
         nodes[i].disabled = false;
    }
    this.setState({coursesDisplay: []});
    this.setState({likedCourses: []});
    this.setState({dislikedCourses: []});
  }

  setLikedCourses = (course)=>{
    let temp = this.state.likedCourses
    temp.push(course);
    this.setState({ likedCourses: temp });
    console.log(this.state.likedCourses);
  }

  setDislikedCourses = (course) =>{
    let temp2 = this.state.dislikedCourses
    temp2.push(course);
    this.setState({ dislikedCourses: temp2 });
    console.log(this.state.dislikedCourses);
  }

  getKeywordOptions() {
    let keywordOptions = [];

    for(const keyword of this.props.subjects) {
      keywordOptions.push(<option key={keyword}>{keyword}</option>);
    }

    return keywordOptions;
  }

  getPrevCourses = () => {
    let courses = [];
    for (const course of Object.entries(this.props.courses)) {
      for (const prevName of Object.values(
        this.state.previousCourseNames.data
      )) {
        if (course[0] === prevName) {
          courses.push(
          <PreviousCourse 
            key={course[0]} 
            data={course[1]} 
            setLikedCourses={this.setLikedCourses}
            setDislikedCourses={this.setDislikedCourses}
            />);
        }
      }
      if (!this.state.previousCourseNames.data.includes(course[0]) && !this.state.coursesDisplay.includes(course[1])){
        this.state.coursesDisplay.push(course[1]);
      }
    }
    console.log("all other courses" + this.state.coursesDisplay);
    return courses;
  };

  getDisplayCourses(){
    let filteredCourses = []
    //this.state.coursesDisplay;

    //find liked key words
    let likedKeywords = this.getLikedKeywords();
    //find disliked key words
    let dislikedKeywords = this.getDislikedKeywords();
    let keywords = [];
    //find overall liked keywords
    for (const i of likedKeywords){
      if (!dislikedKeywords.includes(i)){
        keywords.push(i);
      }
    }
    console.log("my keywords: " + keywords);
    //add the courses with the overall key words to be recommended
    console.log("Pos display"+ this.state.coursesDisplay);
    for(const course in Object.values(this.state.coursesDisplay)){
      for(const key in keywords){
        if (course.keywords.includes(key)){
          filteredCourses.push(course);
          console.log();
        }
      }
    }

    // let subs = getLikedSubjects();
    // for (const course in Object.values(this.state.coursesDisplay)){
    //   if (subs.includes(course.subject)){
    //     if(!filteredCourses.includes(course)){
    //       filteredCourses.push(course);
    //     }
    //   }
    // }

    this.setState({ coursesDisplay: filteredCourses });
    // return filteredCourses;
  }

  getLikedKeywords(){
    let keywords = [];
    for(const i of Object.values(this.state.likedCourses)){
      for (const j of i.keywords){
        if(!keywords.includes(j)){
          keywords.push(j);
        }
      }
    }
    return keywords;
  }

  getDislikedKeywords(){
    let keywords = [];
    for(const i of Object.values(this.state.dislikedCourses)){
      for (const j of i.keywords){
        if(!keywords.includes(j)){
          keywords.push(j);
        }
      }
    }
    return keywords;
  }

  getLikedSubjects(){
    let subjects = [];
    for(const course of Object.values(this.state.likedCourses)){
      console.log("Subject: " + course.subject);
      if(!subjects.includes(course.subject)){
        subjects.push(course.subject);
      }
    }
    console.log("subjects: "+ subjects);
    return subjects;
  }

  // getCheckBoxes(){
  //   <Form.Check
  //     type="checkbox"
  //     label="first radio"
  //     name="formHorizontalRadios"
  //     id="formHorizontalRadios1"
  //   />
  // }

  chooseSubject(){
    return(
      <Form>
        <Form.Group style={{marginTop: "10px"}} controlId="formSubject">
          <Form.Label>Select Interesting Subjects</Form.Label>
          <Form.Control as="select" ref={this.subjects} onChange={() => this.getDisplayCourses()} multiple>
            {this.getLikedSubjects()}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }

  render() {
    const displayKeywords = this.state.displayKeywords;
    const displayNewCourses = this.state.displayNewCourses;
    const rateButton = this.state.rateButton;
    let mybutton;
    let select;
    let courses;
    let clearbutton;

    if (displayKeywords){
      select = <div style={{ margin: "5px" }}>{this.chooseSubject()}</div>
      // <Form.Group as={Row} style={{ marginTop: "10px" }}>
      //           <Form.Label as="legend" column sm={2}>
      //             Filters
      //           </Form.Label>
      //           <Col sm={10}>
      //             <Form.Check
      //               type="checkbox"
      //               label="first radio"
      //               name="formHorizontalRadios"
      //               id="formHorizontalRadios1"
      //             />
      //           </Col>
      //         </Form.Group>
      // <div style={{ margin: "5px" }}>{this.chooseKeyword()}</div>
    }
    else{
      select = <div></div>
    }

    if (displayNewCourses){
      courses = <div style={{ marginLeft: "30vw", paddingLeft: '5px', paddingRight: '5px', height: 'calc(100vh - 10px)'}}><CourseArea data={this.state.coursesDisplay} /></div>
    }
    else{
      courses = <div></div>
    }

    if(rateButton){
      mybutton = <Button style={{marginTop: '5px'}} onClick={this.getDisplayCourses, this.handleDoneClick}>Done Rating</Button>
      clearbutton = <Button variant="outline-danger" style={{marginLeft: '5px', marginTop: '5px'}} onClick={this.handleAgainClick} >Clear Selection</Button>
    }
    else{
      mybutton = <Button variant="danger" style={{marginTop: '5px'}} onClick={this.handleAgainClick} >Rate Again</Button>
      clearbutton = <div></div>
    }

    return (
      <>
        <Card style={{width: 'calc(30vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', alignContent: 'center', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Rate Your Courses!</Card.Title>
            <div id="rateCourses" style={{ margin: "5px" }}>{this.getPrevCourses()}</div>
            {mybutton}
            {clearbutton}
            {select}
          </Card.Body>
        </Card>
        {courses}
      </>
      );
  }
}

export default RecommendSidebar;
