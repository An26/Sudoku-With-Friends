const mongoose = require('mongoose');
const User = require('./../models/UsersModel');


exports.self = (req,res) => {
    res.json({status:'ok'});
};


exports.get = (req,res) => {
    var userId = req.params.userid;
};


exports.update = (req, res) => {
    var userId = req.params.userid;
};


exports.create = (req,res) => {
    const userId = req.params.userid;
    const name = req.body.name;
    const username = req.body.username;

    const newUser = new User({
        username: username,
        name: name,
    });

    newUser.save( (err, user) => {
        if(err) {
            res.status('500').json({ status: 'error', message: 'Cannot save new user.'});
        } else {
            res.json({status: 'ok'});
        }
    });
};