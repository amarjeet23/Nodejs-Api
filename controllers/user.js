const User = require("../models/user")

exports.userById=(req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"user not found"
            })

        }
        // Adds profile to req with user info
        req.profile=user 
        next()
    })
}

exports.hasAuthorization = (req,res,id,next)=>{
    const  authorised = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorised){
        return res.status(403).json({
            error:"user is not allowed to perform this action"
        });
    }

    next();
}

exports.allUsers = (req,res)=>{
    User.find((err,user)=>{
        if(err){
            return res.json({err:err})
        }
        res.json({user})

        // for getting specef ic field
    }).select("name email updated created")
    
}
exports.getUser =(req,res)=>{
    req.profile.hashed_password = undefined,
    req.profile.salt=undefined
    return res.json(req.profile);
}


exports.updateUser =(req,res)=>{
    let user = req.profile;
    user = _.extend(user,req.body);
    user.updated = Date.now();
    user.save(err =>{
        if(err){
            res.status(400).json({error:"you are not authorized to perform this"})
        }
        user.hashed_password = undefined
        user.salt =undefined;
        res.json({user})
    })
}
exports.deleteUser =(req,res)=>{
    let user = req.profile;
    
    user.remove((err,user) =>{
        if(err){
            res.status(400).json({error:err})
        }
        user.hashed_password = undefined
        user.salt =undefined;
        res.json({msg:"user deleted successfully"})
    })
}