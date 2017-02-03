import React from 'react';
import { connect } from 'react-redux';
import { initialPuzzle, solution, selectedCell } from '../../actions/gameLogicActions.js';

@connect((store)=>{
	return {
     initialPuzzle: store.gameLogic.initialPuzzle,
	 solution: store.gameLogic.solution,
     selectedCell: store.gameLogic.selectedCell
   };
})

export default class GameInputBtn extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    handleInputBtn(event) {
        let newValue = event.target.value;
		this.props.dispatch(initialPuzzle({
			cell: this.props.selectedCell,
			value: newValue
		}));
	}
    
    
    createNumButtons() {
		var html = [];
		for(var i=1; i<10; i++) {
			html.push(
				<span style={buttonSpanStyle} key={i}>
				<button className="inputButton" 
					value={i} 
					onClick={this.handleInputBtn.bind(this)} 
					style={buttonStyle}>
					{i}
				</button>
				</span>);
		}
		return html;
	}

    render() {
        return(
            <div>
                {this.createNumButtons()}
            </div>
        )
    }

}

// styling
	var buttonStyle = {
		margin: "5px",
		height: "30px",
		width: "30px",
		background: "purple",
		color: "white"	

	}

	var buttonSpanStyle = {
		marginLeft: "10px"
	}

// end of styling



