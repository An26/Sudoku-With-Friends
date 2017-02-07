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
    const player = req.body.player;
    const gameBoard = req.body.gameBoard;

    // check for required variables
    if( !player || !gameBoard ) {
        res.status(404).json({ status: 'error', message: 'required variable missing' });
        return;
    }

    // find the game we need to update
    Game.findById(gameId, (err, game) => {
        if( err ) {
             res.status(404).json({ status: 'error', message: 'Game not found' });
             return;
         }

        // I don't like this but it's quick and dirty
        if( game.players[0].playerId === player ) {
            game.players[0].gameBoard = gameBoard;
        } else if ( game.players[1].playerId === player ) {
            game.players[1].gameBoard = gameBoard;
        } else {
            res.status(404).json({ status: 'error', message: 'player not found' });
            return
        }

        // do the save
        game.save( (err, game) => {
            if( err ) {
                res.status(500).json({ status: 'error', message: 'problem saving gameBoard'});
                return;
            }
            res.json({status: 'ok'});
        });
    });
};


exports.create = (req,res) => {
    const initialBoard = req.body.initialBoard;
    const solution = req.body.solution;
    const player = req.body.username;

    const newGame = new Game({
        initialBoard: initialBoard,
        solution: solution,
    });

    newGame.players.push({ gameBoard: initialBoard });

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
    const player = req.body.player

    // players is required
    if( !player ) {
        res.status(400).json({ status: 'error', message: 'player variable is required' });
        return;
    }

    // Find our game
     Game.findById(gameId, (err, game) => {
         if( err ) {
             console.log(err);
             res.status(404).json({ status: 'error', message: 'Game not found'});
             return;
         }

         // Check that there is only on player
         if( game.players.length != 1 ) {
             res.status(400).json({ status: 'error', message: 'game already full' });
             return;
         }

         game.players.push({ gameBoard: game.initialBoard });

         game.save( (err, game) => {
             if( err ) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'problem joining game'});
                return;
             }
            res.json({status: 'ok'});
         });
     });
};