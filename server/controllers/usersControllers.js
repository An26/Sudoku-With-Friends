const mongoose = require('mongoose');
const User = require('./../models/UsersModel');


exports.self = (req,res) => {
    res.json({status:'ok'});
};


exports.get = (req,res) => {
    var userId = req.params.userid;
    User.find({'FBId':userId},function(err,user){
        res.send({'userData': user});
        console.log('user',user);
    })
};


exports.update = (req, res) => {
    var userId = req.params.userid;
};


exports.create = (req,res) => {
 //   const userId = req.params.userid;
//    const name = req.body.name;
 //   const username = req.body.username;
    var response = req.body;
    console.log('body',response);

    const newUser = new User({
        username: response.email,
        name: response.first_name,
        FBId: response.id,
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