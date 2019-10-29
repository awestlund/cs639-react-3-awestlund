import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

class Course extends React.Component {
  constructor(props) {
    super(props);
  }

  addCart = () =>{
    console.log("Add Cart Clicked");
    this.props.setCartCourses(this.props.data);
    var nodes = document.getElementById(this.props.data.name+this.props.where).getElementsByClassName('btn btn-outline-primary');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = true;
    }
  }

  render() {
    return (
      <Accordion>
        {this.inCart}
        <Card id={this.props.data.name+this.props.where} style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{fontWeight:"bold"}}>{this.props.data.name}
            </Accordion.Toggle>
            <Button style={{position: "absolute",right: "5px", padding: "5px", color: "white", backgroundColor: "#007bff"}} variant="outline-primary" onClick={this.addCart}>Add to Cart</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mb-2 text-muted">
              Number: {this.props.data.number} <br></br> 
              Credits: {this.props.data.credits} <br></br> 
              Discription: {this.props.data.description} <br></br> 
              <br></br> 
              Sections: <br></br>
              {this.getSections(this.props.data.sections)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }

  getSections(sections){
    // add to some structure here
    let allSections = [];
    for(const section of Object.entries(sections)){
      allSections.push(this.makeSection(section));
    }
    return allSections;
  }

  makeSection(section){
    return (
      <Accordion>
        <Card style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">{section[0]}
            </Accordion.Toggle>
            <Button style={{position: "absolute",right: "5px", padding: "5px", color: "white", backgroundColor: "#007bff"}} variant="outline-primary" onClick={this.addCart}>Add to Cart</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mb-2 text-muted">
              Instructor: {section[1].instructor} <br></br> 
              Location: {section[1].location} <br></br> 
              Times: <br></br>
              {this.getTimes(section[1].time)}
              Subsections: <br></br>
              {this.getSubsections(section[1].subsections)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  getSubsections(subsections){
    // add to some structure here
    let allSubsections = [];
    for(const subsection of Object.entries(subsections)){
      allSubsections.push(this.makeSubsection(subsection));
    }
    return allSubsections;
  }

  makeSubsection(subsection){
    return (
      <Accordion>
        <Card style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">{subsection[0]}
            </Accordion.Toggle>
            <Button style={{position: "absolute",right: "5px", padding: "5px", color: "white", backgroundColor: "#007bff"}} variant="outline-primary" onClick={this.addCart}>Add to Cart</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mb-2 text-muted">
              Location: {subsection[1].location} <br></br> 
              Times: <br></br>
              {this.getTimes(subsection[1].time)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  getTimes(timeNode){
    let allTimes = []
    for(const dayTime of Object.entries(timeNode)){
      allTimes.push(this.makeTime(dayTime));
    }
    return allTimes
  }

  makeTime(dayTime){
    return(
      <div>
        <Card style={{width: '50%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>{dayTime[0].toUpperCase()}</Card.Header>
          <Card.Body>{dayTime[1]}</Card.Body>
        </Card>
      </div>
    )
  }

}

export default Course;
