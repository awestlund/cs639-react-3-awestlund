import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
import CourseArea from "./CourseArea";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RecommendSidebar from "./RecommendSidebar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      cartCourses: [],
      previousCourses: [],
      previousCourseNames: {},
      recommededCourses: {},
      subjects: []
    };

  }

  componentDidMount() {
    fetch("https://mysqlcs639.cs.wisc.edu:5000/classes")
      .then(res => res.json())
      .then(data =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data)
        })
      );
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  setCartCourses = (data) => {
    let temp = this.state.cartCourses;
    if (!temp.includes(data)){
      temp.push(data);
      this.setState({ cartCourses: temp });
    }
  }

  // setPreviousCourses(previous) {
  //   this.setState({previousCourses: previous})
  // }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs defaultActiveKey="Recommend" id="tabs-home">
          <Tab eventKey="Search" title="Course Search">
            <Sidebar
              setCartCourses={this.setCartCourses}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea 
                data={this.state.filteredCourses} 
                setCartCourses={this.setCartCourses}
                where="Search"
              />
            </div>
          </Tab>
          <Tab eventKey="Cart" title="Cart">
            <Cart
              setCartCourses={this.setCartCourses}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea 
                data={this.state.cartCourses}
                setCartCourses={this.setCartCourses}
                where={"Cart"}
              />
            </div>
          </Tab>
          <Tab eventKey="Recommend" title="Recommened Courses">
            <RecommendSidebar 
              courses={this.state.allCourses} 
              subjects={this.state.subjects}
              setCartCourses={this.setCartCourses}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
