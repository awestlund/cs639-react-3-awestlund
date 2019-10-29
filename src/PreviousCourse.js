import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

class PreviousCourse extends React.Component {

  thumbsUpClick = () =>{
    console.log("Thumbs Up Clicked");
    this.props.setLikedCourses(this.props.data);
    document.getElementById(this.props.data.name).style.border = "thick solid green";
    document.getElementById(this.props.data.name).style.backgroundColor = "#b8f5ce";
    document.getElementById(this.props.data.name + "up").disabled = "true";
    document.getElementById(this.props.data.name + "down").disabled = "true";
  }

  thumbsDownClick = () =>{
    console.log("Thumbs Down Clicked");
    console.log("key " + this.props.data.name);
    this.props.setDislikedCourses(this.props.data);
    document.getElementById(this.props.data.name).style.border = "thick solid red";
    document.getElementById(this.props.data.name).style.backgroundColor = "#ffc4c4";
    document.getElementById(this.props.data.name + "up").disabled = "true";
    document.getElementById(this.props.data.name + "down").disabled = "true";
  }

  // setLikedCourses(){
  //   this.props.setLikedCourses(this.setLikedCourses(this.props.data));
  // }
  // setDislikedCourses(){
  //   this.props.setDislikedCourses(this.props.data);
  // }

  render() {
    return (
      <Accordion>
        <Card id={this.props.data.name} style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>
            <Button id={this.props.data.name + "up"} style={{right: "5px", paddingRight: "5px", marginRight: "5px"}} variant="success" onClick={this.thumbsUpClick}>👍</Button>
            <Button id={this.props.data.name + "down"} style={{right: "5px", paddingRight: "5px", marginRight: "5px"}} variant="danger" onClick={this.thumbsDownClick}>👎</Button>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{fontWeight:"bold"}}>{this.props.data.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mb-2 text-muted">
              Number: {this.props.data.number} <br></br> 
              Credits: {this.props.data.credits} <br></br> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}

export default PreviousCourse;
