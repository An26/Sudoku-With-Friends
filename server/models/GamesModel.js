const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Player = new Schema({
    playerId: {
        type: Schema.Types.ObjectId,
    },
    gameBoard: {
        type: Array,
    },
    playerName: String,
});

//const Players = mongoose.model('Player', PlayersSchema);

const GamesSchema = new Schema({
    initialBoard: {
        type: Array,
        required: true,
    },
    solution: {
        type: Array,
        required: true,
    },
    userRoomName: {
        type: String,
        required: true,
        unique:true
    },
    players: [Player]
    
});

const Games = mongoose.model('Game', GamesSchema);

module.exports = Games;