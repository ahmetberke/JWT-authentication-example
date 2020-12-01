const   User = require('../models/user'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcryptjs');



module.exports = (email, password, auth) => {
    User.findOne({email}, (err, doc) => {
        if(err) return auth({error:"No Match", success:false});
        bcrypt.compare(password, doc.password, (err,res)=>{
            if(!res) return auth({success: false, user: null}); 
            const token = jwt.sign({username:doc.username, id:doc.id},process.env.ACCESS_TOKEN_SECRET, {expiresIn:"2h"});
            return auth({success: true, user:doc, token:token});
        })
    });
}
