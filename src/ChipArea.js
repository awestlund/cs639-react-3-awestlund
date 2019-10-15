import React from 'react';
import Card from 'react-bootstrap/Card'
import Chip from './Chip'

class ChipArea extends React.Component {
    getChips() {
        let chipList = [];
        for(const chipLabel of Object.values(this.props.chips)) {
            chipList.push(<Chip key={chipLabel} title={chipLabel} onChipRemove={this.props.onChipRemove}/>)
        }

        return chipList
    }
    render() {
        return <Card style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start', padding:4}}>
                    {this.getChips()}
                </Card>
    }

}

export default ChipArea;