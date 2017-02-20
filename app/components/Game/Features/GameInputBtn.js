import React from 'react';
import { connect } from 'react-redux';
import { playerBoardUpdate, selectedCell, opponentBoard } from '../../actions/gameLogicActions.js';
import axios from 'axios';
import cookie from 'react-cookie';
var opponentBoardInterval;

@connect((store)=>{
	return {
		playerBoardUpdate: store.gameLogic.playerBoardUpdate,
		roomDetails: store.multiplayer.roomDetails,
		playerBoard: store.gameLogic.playerBoard,
		solution: store.gameLogic.solution,
		selectedCell: store.gameLogic.selectedCell,
		opponentBoard: store.gameLogic.opponentBoard,
		joinRoomId: store.multiplayer.joinRoomId,
		gameType: store.gameType.gameType,
   };
})

export default class GameInputBtn extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    handleInputBtn(event) {
		let self = this
        let newValue = event.target.value;
		this.props.dispatch(playerBoardUpdate({
			cell: this.props.selectedCell,
			value: newValue
		}))
	}

	componentDidMount(){
		if(this.props.gameType === 'multi') {
			opponentBoardInterval = setInterval(this.opponentBoardUpdates.bind(this), 20000)
		}
		
	}

	componentDidUpdate() {
		console.log(this.props.opponentBoard)
		var self = this;
			if (self.props.selectedCell && (self.props.playerBoard[self.props.selectedCell] === self.props.solution[self.props.selectedCell]) 
				&& this.props.gameType === 'multi') {
					var gameId = self.props.roomDetails.id || self.props.joinRoomId;
					axios.put(`/api/game/${gameId}`, {
						'playerId': cookie.load('userId'),
						'cell': self.props.selectedCell,
						'value': self.props.solution[self.props.selectedCell]
					})
				}
	}
    
	opponentBoardUpdates() {
		var self = this;
		var gameId = this.props.roomDetails.id || this.props.joinRoomId || false;
		if( gameId && this.props.opponentBoard.length) {
			axios.get(`/api/opponent/${gameId}/${cookie.load('userId')}`)
			.then((response) => {
				if(opponentBoard && response) {
				self.props.dispatch(opponentBoard(response.data.opponentBoard));
				}
			}).catch(function(err) {
				console.log(err);
			})
		}
	}

	componentWillUnmount() {
		clearInterval(opponentBoardInterval);
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

