import React from 'react';
import { connect } from 'react-redux';
import { playerBoardUpdate, selectedCell, opponentBoard } from '../../actions/gameLogicActions.js';

@connect((store)=>{
	return {
		playerBoardUpdate: store.gameLogic.playerBoardUpdate,
		roomId: store.multiplayer.roomDetails,
		playerBoard: store.gameLogic.playerBoard,
		solution: store.gameLogic.solution,
		selectedCell: store.gameLogic.selectedCell,
		joinRoomId: store.multiplayer.joinRoomId,
   };
})

export default class GameInputBtn extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    handleInputBtn(event) {
        let newValue = event.target.value;
		this.props.dispatch(playerBoardUpdate({
			cell: this.props.selectedCell,
			value: newValue
		}))
			if (this.props.playerBoard[this.props.selectedCell] === this.props.solution[this.props.selectedCell]) {
				var gameId = this.props.roomId || this.props.joinRoomId;
				axios.put(`/api/game/${gameId}`, {
					'player': cookie.load('username'),
					'cell': this.props.selectedCell,
					'value': this.props.solution[this.props.selectedCell]
				}).then((response) => {
					this.props.dispatch(opponentsBoard(response.opponentBoard));
				})
			}
		// this.props.dispatch(playerBoard({
			// cell: this.props.selectedCell,
			// value: newValue
		// }));
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
		background: "#fafafa",
		color: "#333333",
		fontFamily: "'Quicksand', sans-serif"

	}

	var buttonSpanStyle = {
		marginLeft: "10px"
	}

// end of styling

