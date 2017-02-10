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


exports.update = (req, res) => {
    var userId = req.params.userid;
};


exports.create = (req,res) => {
    var response = req.body;

    const newUser = new User({
        username: response.email,
        name: response.first_name,
        FBId: response.id,
        password: response.password,
    });

    newUser.save( (err, user) => {
        if(err) {
            console.log(err)
            res.status('500').json({ status: 'error', message: 'Cannot save new user.'});
        } else {
            res.json({status: 'ok'});
        }
    });
};