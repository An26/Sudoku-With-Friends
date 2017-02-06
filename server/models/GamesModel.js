const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GamesSchema = new Schema({
    initialBoard: {
        type: Array,
        required: true,
    },
    solution: {
        type: Array,
        required: true,
    },
    player1: {
        playerId: {
            type: Schema.Types.ObjectId,
        },
        gameBoard: {
            type: Array,
        },
    },
    player2: {
        playerId: {
            type: Schema.Types.ObjectId,
        },
        gameBoard: {
            type: Array,
        },
    },
});

const Games = mongoose.model('Game', GamesSchema);

module.exports = Games;