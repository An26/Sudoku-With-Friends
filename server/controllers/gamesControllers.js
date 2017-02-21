"use strict"
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
            res.send(data);
        } else {
            res.status(404).json({message: 'not found'});
        }
    });
};


exports.getOpponent = (req, res) => {
    const gameId = req.params.gameId;
    var playerId = req.params.userId;
    var playerBoard;
    var opponentBoard;
    Game.findOne({_id: gameId}, 'players' ).exec( (err, data) => {
       if(data.players[0].playerId.toString() === playerId) {
           playerBoard = data.players[0].gameBoard;
           opponentBoard = data.players[1] ? data.players[1].gameBoard : [];
       }
       else if(data.players.length === 2 && data.players[1].playerId.toString() === playerId){
           playerBoard = data.players[1].gameBoard;
           opponentBoard = data.players[0].gameBoard;
       } else {
           res.json({ status: 'error', message: 'player not found' });
            return
       }
       res.json({playerBoard: playerBoard, opponentBoard: opponentBoard})
    })
}

exports.update = (req, res) => {
    // gameId is a roomId
    const gameId = req.params.id;
    const playerId = req.body.playerId;
    const cell = req.body.cell.toString();
    const value = req.body.value.toString();
    let opponentBoard, playerBoard;

    // check for required variables
    if( !playerId || !cell ) {
        res.status(404).json({ status: 'error', message: 'required variable missing' });
        return;
    }

    // find the game we need to update
    Game.findById(gameId, (err, game) => {
        if( err ) {
             res.status(404).json({ status: 'error', message: 'Game not found' });
             return;
         }
         var opponentBoard;
         var playerBoard;
        // I don't like this but it's quick and dirty

        if( game.players[0].playerId.toString() === playerId ) {
            game.players[0].gameBoard.set(cell, value);
            playerBoard = game.players[0].gameBoard;
            opponentBoard = game.players[1].gameBoard;
        } else if ( game.players[1].playerId.toString() === playerId ) {
            game.players[1].gameBoard.set(cell, value);
            playerBoard = game.players[1].gameBoard;
            opponentBoard = game.players[0].gameBoard;
        }  else {
            res.status(404).json({ status: 'error', message: 'player not found' });
            return
        }
        game.save( (err, game) => {
            if( err ) {
                res.status(500).json({ status: 'error', message: 'problem saving gameBoard'});
                return;
            }
            res.json({status: 'ok', opponentBoard: opponentBoard, playerBoard: playerBoard});
        });
    });
};


exports.create = (req,res) => {
    const room = req.body.roomName.toLowerCase();
    const initialBoard = req.body.initialBoard;
    const solution = req.body.solution;
    const playerName = req.body.username;
    const playerId = req.body.userId;
    
    const newGame = new Game({
        initialBoard: initialBoard,
        solution: solution,
        userRoomName: room
    });

    newGame.players.push({ gameBoard: initialBoard, playerName: playerName, playerId: playerId });
    
    Game.find({userRoomName: room}, function(err, response) {
        if(response[0]) {
            res.json({status: 'failure'})
        }
        else {
            newGame.save( (err, game) => {
                if(err) {
                    res.status('500').json({ status: 'error', message: 'Cannot save new game.'});
                } else {

                    Game.find({'userRoomName': room}).then(function(correctRoom) {
                    res.json({'id': correctRoom[0]._id, 'roomLength': correctRoom[0].players.length});    
                    })    
               }
            })
        }
    })
 
};


exports.join = (req, res) => {
    const gameId = req.params.id;
    const playerName = req.body.playerName;
    const playerId = req.body.playerId;

    // players is required
    if( !playerId ) {
        res.status(400).json({ status: 'error', message: 'playerId variable is required' });
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
         if( game.players.length >= 2 ) {
             res.status(400).json({ status: 'error', message: 'game already full' });
             return;
         }

         game.players.push({ gameBoard: game.initialBoard, playerName: playerName, playerId: playerId });

         game.save( (err, game) => {
             if( err ) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'problem joining game'});
                return;
             }
         });
         res.send({status: 'ok'});
     });
};

exports.delete = (req, res) => {
    const roomId = req.params.id;
    const playerId = req.body.playerId;

    Game.findById(roomId, (err, room) =>{
        room.players.splice({playerId:playerId}, 1)
        room.save((err, room) => {
            if(err) {
            console.log(err);
            res.status(500).json({ status: 'error', message: 'problem deleting user record'});
            return;
        }
            res.send(room)
        })
    })
}