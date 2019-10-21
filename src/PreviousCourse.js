import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

class PreviousCourse extends React.Component {

  thumbsUpClick(){
    console.log("Thumbs Up Clicked")
  }

  thumbsDownClick(){
    console.log("Thumbs Down Clicked")
  }

  render() {
    return (
      <Accordion>
        <Card style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Header>
            <Button style={{right: "5px", paddingRight: "5px", marginRight: "5px"}} variant="success" onClick={this.thumbsUpClick}>👍</Button>
            <Button style={{right: "5px", paddingRight: "5px", marginRight: "5px"}} variant="danger" onClick={this.thumbsDownClick}>👎</Button>
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
