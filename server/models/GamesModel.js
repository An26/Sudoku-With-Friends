const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Player = new Schema({
    playerId: {
        type: Schema.Types.ObjectId,
    },
    gameBoard: {
        type: Array,
    },
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
    players: [Player],
});

const Games = mongoose.model('Game', GamesSchema);

module.exports = Games;