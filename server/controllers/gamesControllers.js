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
            // console.log(data);
            res.send(data);
        } else {
            res.status(404).json({message: 'not found'});
        }
    });
};


exports.getOpponent = (req, res) => {
    const gameId = req.params.id;
    var player = req.params.username;
    var playerBoard;
    var opponentBoard;
    // console.log( 'player', player);
    Game.findOne({_id: gameId}, 'players' ).exec( (err, data) => {
       if(data.players[0].playerName.toLowerCase() === player.toLowerCase()) {
           playerBoard = data.players[0].gameBoard;
           opponentBoard = data.players[1] ? data.players[1].gameBoard : [];
       }
       else if(data.players[1].playerName.toLowerCase() === player.toLowerCase()){
           playerBoard = data.players[1].gameBoard;
           opponentBoard = data.players[0].gameBoard;
       } else {
           res.status(404).json({ status: 'error', message: 'player not found' });
            return
       }
       res.json({playerBoard: playerBoard, opponentBoard: opponentBoard})
    })
}

exports.update = (req, res) => {
    // gameId is a roomId
    const gameId = req.params.id;
    const player = req.body.player.toLowerCase();
    const cell = req.body.cell.toString();
    const value = req.body.value.toString();
    // console.log('iiii', gameId, player, cell, value);

    // check for required variables
    if( !player || !cell ) {
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
        if( game.players[0].playerName === player ) {
            // console.log('playerboard')
            var mainplayer = game.players[0].gameBoard
                for (var i = 0; i <= mainplayer.length; i++) {
                    // console.log('cell', cell)
                    // console.log('i', i, i == cell)
                    if(i == cell) {
                        // console.log('truthy')
                        //  console.log('222', player1[cell] = value)
                       mainplayer[cell] = value
                    }
                }

            playerBoard = game.players[0].gameBoard;
            opponentBoard = game.players[1].gameBoard;
            // console.log('gammy1', game);
        } else if ( game.players[1].playerName === player ) {
            // console.log('opponentboard')
            var opponentPlayer = game.players[1].gameBoard
            for (var i = 0; i <= opponentPlayer.length; i++) {
                // console.log('333', opponentPlayer[i] === value)
               if(i == cell) {
                    //  console.log('222', opponent[cell] = value)
                //    console.log('gammy2', game);
                   opponentPlayer[cell] = value
                 }
            }
            playerBoard = game.players[1].gameBoard;
            opponentBoard = game.players[0].gameBoard;
            // return playerBoard
        }  else {
            res.status(404).json({ status: 'error', message: 'player not found' });
            return
        }
            //  console.log('truthy', opponentPlayer)
            // console.log('falsy', playerBoard)
        // do the save
        game.save( (err, game) => {
            // console.log('game2', game.players[0].gameBoard)
            // console.log('game2', game.players[1].gameBoard)
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
    const player = req.body.username;
    
    const newGame = new Game({
        initialBoard: initialBoard,
        solution: solution,
        userRoomName: room
    });

    newGame.players.push({ gameBoard: initialBoard, playerName: player });
    
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
    const player = req.body.player.toLowerCase();
// console.log('det', player);

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
         if( game.players.length >= 2 ) {
             res.status(400).json({ status: 'error', message: 'game already full' });
             return;
         }

         game.players.push({ gameBoard: game.initialBoard, playerName: player });

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
    const player = req.body.player;

    Game.findById(roomId, (err, room) =>{
        room.players.splice({playerName:player}, 1)
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