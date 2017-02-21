"use strict"
const mongoose = require('mongoose');
const User = require('./../models/UsersModel');

exports.self = (req,res) => {
    res.json({status:'ok'});
};


exports.get = (req,res) => {
    var userId = req.params.userid;
    User.find({'FBId':userId},function(err,user){
        res.send({'userData': user});
    })
};

exports.login = (req, res) => {
    var email = req.params.email;
    var password = req.params.password.toLowerCase();
    console.log(email, password);
    User.find({'email': email}, function(err, response) {
        console.log('type', typeof response);
        console.log('rest', response == '')
        // check with jessica how to bcrypt this password and compare it with the mongoose pass
        if(response == '') {
            res.json({status: 'noUser'})
        } else {
             if(response[0].password.toString() === password) {
                res.json({status:'ok', user: res})
            } else if(response[0].password.toString() !== password){
                res.json({status: 'wrongPass'})
            } 
        }
    })
}


exports.update = (req, res) => {
    var userId = req.params.userid;
};


exports.create = (req,res) => {
    var response = req.body;
    console.log('resp', response)
    let newUser; 
    newUser = new User({
        email: response.email,
        name: response.first_name,
        FBId: response.id || null,
        password: response.password,
    });
    console.log(newUser)
    if(newUser.FBId !== null) {
        User.findOne({FBId: newUser.FBId}, function(err, currentUser) {
            if(currentUser) {
                res.json({status: 'ok', user: currentUser});
            } else {
                newUser.save( (err, user) => {
                    if(err) {
                        console.log(err)
                        res.status('500').json({ status: 'error', message: 'Cannot save new user.'});
                    } else {
                        res.json({status: 'ok', user: user});
                    }
                });
            }
        })
    } else {
        User.findOne({email: newUser.email}, function(err, user) {
            console.log('user', user);
            if(user) {
                res.json({status: 'existingUser'});
            } else {
                newUser.save( (err, user) => {
                    if(err) {
                        console.log(err)
                        res.status('500').json({ status: 'error', message: 'Cannot save new user.'});
                    } else {
                        res.json({status: 'ok', user: user});
                    }
                });
            }
        })
    }
};