import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import SearchAndFilter from './SearchAndFilter';
import ChipArea from './ChipArea';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.state = {
      chips: [],
      allTerms: true
    }
  }

  setState(currState) {
    if(this.state.chips.length === 0) {
      return;
    }
    console.log(this.state.chips)
    if(currState) {
      console.log("Any Term")
      this.state.allTerms = false;
    } else {
      console.log("All Terms")
      this.state.allTerms = true;
    }
    this.setCourses();
  }

  addChip(e) {
    if(e.key == 'Enter' && this.search.current.value != '') {
      if(!this.state.chips.includes(this.search.current.value)) {
        this.state.chips.push(this.search.current.value);
        this.setCourses();
      }
      this.search.current.value = '';
    }
  }
  
  onChipRemove(title) {
    const chips = this.state.chips
    if(chips.length === 1) {
      console.log("test")
      chips.splice(0, 1);
      this.state.chips = chips
      this.setCourses();
    }
    for (var index = chips.length; index--;) {
      if (chips[index] === title) {
        chips.splice(index, 1)  
      }
    }
    this.setState({chips})
  }

  setCourses() {
    this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, this.state.chips, this.state.allTerms, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value));
  }

  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  render() {
    if (this.state.chips === null) return null;

    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
            <Form.Group controlId="keywordToggle" onChange={() => this.setState(this.state.allTerms)} style={{width: '100%'}}>
                <Form.Label>Classes Must Match:</Form.Label>
                <ButtonToolbar>
                  <ToggleButtonGroup type="radio" name="filterOption" defaultValue={0}>
                    <ToggleButton value={0}>All Tags</ToggleButton>
                    <ToggleButton value={1}>Any Tag</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Form.Group>
              
              <Form.Group controlId="formKeywords" onKeyDown={(e) => this.addChip(e)} style={{width: '100%'}}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" ref={this.search}/>
              </Form.Group>

              <ChipArea chips={this.state.chips} onChipRemove={this.onChipRemove.bind(this)}/>

              <Form.Group style={{marginTop: '10px'}} controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onChange={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="minimum" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="maximum" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sidebar;