const mongoose = require('mongoose');
const User = require('./../models/UsersModel');
const Game = require('./../models/GamesModel');


exports.list = (req,res) => {
    Game.find({}).exec( (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: 'server error'});
        } else {
            res.json(data);
        }
    });
};


exports.get = (req,res) => {
    const gameId = req.params.id;

    Game.findOne({_id: gameId}).exec( (err, data) => {
        if(data) {
            res.json(data);
        } else {
            res.status(404).json({message: 'not found'});
        }
    });
};


exports.update = (req, res) => {
    const gameId = req.params.id;
};


exports.create = (req,res) => {
    const initialBoard = req.body.initialBoard;
    const solution = req.body.solution;
    const player = req.body.username;

    const newGame = new Game({
        initialBoard: initialBoard,
        solution: solution,
        player1: {
                playerId: player,
                gameBoard: initialBoard,
            },
    });

    newGame.save( (err, game) => {
        if(err) {
            res.status('500').json({ status: 'error', message: 'Cannot save new game.'});
        } else {
            res.json({status: 'ok'});
        }
    });
};


exports.join = (req, res) => {
    const gameId = req.params.id;
    const player2 = req.body.player2
    var initialBoard = [];

    // Get initialBoard data from Game
    Game.findOne({_id: gameId}).exec( (err, data) => {
        if( err ) {
            console.log(err);
            res.status(404).json({ status: 'error', message: 'Game not found'});
        }
        initialBoard = data.initialBoard;
    }).then( () => {
        // Add player 2 to the database
        Game.findOneAndUpdate({_id: gameId}, { $push: { player2: { initialBoard: initialBoard }}}, { new: false }, (err, data) => {
            if( err ) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Problem joining game'});
            }
            console.log(data);
            res.json({status: 'ok'});
        })
    });


    // // Get data structure to return
    // Game.findOne({_id: gameId}).exec( (err, data) => {
    //     if(data) {
    //         res.json(data);
    //     } else {
    //         res.status(404).json({message: 'not found'});
    //     }
    // });
};