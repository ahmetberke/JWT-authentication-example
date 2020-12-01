const   Express = require('express'),
        Verifier = require("email-verifier"),
        mongoose = require('mongoose'),
        bcrypt = require('bcryptjs');
const { findById } = require('../models/user');

const   User = require('../models/user');


exports.GetUser = (req,res) => {
    var id = req.params.id;
    User.findById(id, (err,doc)=>{
        if (err) return res.status(400).send({error:err})
        if (!doc) return res.status(200).send({message:"No Match"})
        return res.status(200).send({message: "Get User", user:doc})   
    });
}

exports.GetAllUser = (req, res) => {
    User.find({}, (err, doc) => {
        if(err) return res.status(400).send({error:err});
        if(doc.length === 0) return res.status(400).send({error:"No registered Users"});
        return res.status(200).send({message:"Get All Users", users:doc})
    })
}

exports.NewUser = (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        email = req.body.email;
        
    User.findOne({$or: [{username},{email}]}).exec((err, doc) => {
        if(!doc) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(400).send({error:"bcrypt error"});
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return res.status(400).send({error:"bcrypt error"});
                    var newUser = User({
                        username: username,
                        password: hash,
                        email: email,
                        createdDate: Date.now()
                    });
                    newUser.save((err, docs) => {
                        if (err) return res.status(400).send({error:"There was a problem while registering the user"});
                        return res.status(200).send({message:"New User", user:newUser});
                    });
                });
            });
        }else{
            return res.status(400).send({error: "this username or email is already in use"})
        }
    });
}

exports.DeleteUser = (req,res) => {
    var id = req.params.id;
    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) return res.status(400).send({error:"User not found"})
        return res.status(200).send({message: "Delete User", user:doc});
    });
}

exports.UpdateUser = (req,res) => {
    var id = req.params.id,
        update = req.body;
    User.findByIdAndUpdate(id, update, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send({error:"User not found"});
        return res.status(200).send({message:"Update User", user:doc});
    });
}