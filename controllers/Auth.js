const User = require("../models/user")
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
var cookieParser = require('cookie-parser')
const { validationResult} = require('express-validator');

exports.signup = async(req,res,next)=>{
    const {email,password} = req.body
    try{
    
    const existuser =  await User.findOne({email})
    const errors= validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()[0].msg
        });
    }

    if(existuser){
        return res.json({msg:"Email is already registered"})
    }
    
    const user = new User(req.body)
    const signedUser = await user.save()
    res.status(200).json(signedUser)
}
catch(err){
    return next(err)
}
}

exports.signin = (req,res)=>{
    const {email,password} = req.body
    const errors= validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({msg:"Email is not registered"})   
        }
        if(!user.authenticate(password)){
            return res.json({msg:"email and password do not match"})

        }
    

    

    // generate a token with usere id and secret
    const token = jwt.sign({_id:user._id},process.env.SECRET);

    // persist token as t in cookie with expiry date
    res.cookie("t",token,{expire:new Date()+9999})

        // return response with user and token to frontend client
        const {_id,name,email} = user

        return res.json({token,user:{_id,name,email}})    
    })

}
exports.signout = (req,res)=>{
    res.clearCookie("t");
    return res.json({msg:"signout success"})
}

exports.requireSignin = expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth"
    
})