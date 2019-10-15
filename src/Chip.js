import React from 'react';
import Button from 'react-bootstrap/Button';

class Chip extends React.Component {

    render() {
        return <div style={{borderRadius:5, borderColor:'grey', backgroundColor:'#f5f5f5',
                            padding:4, margin:2, display:'flex', flexDirection:'row'}}>

                    <span>{this.props.title}</span>      
                    <Button variant='secondary' style={{fontSize:10, padding:4, width:25, height:25, marginLeft:3}} 
                        onClick={() => this.props.onChipRemove(this.props.title)}>X
                    </Button>
                </div>
    }
}

export default Chip;