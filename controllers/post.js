
const Post = require('../models/post')
// express-validator error msg
const { validationResult} = require('express-validator');

exports.getpost = (req,res)=>{
    res.send("routes is working......")
};

exports.createPost = (req,res)=>{
    // error msg validator
const errors= validationResult(req)
if (!errors.isEmpty()) {
    return res.status(422).json({ 
        errors: errors.array()[0].msg
     });
  }

    const user = new Post(req.body)
    user.save((err,post)=>{
        if(err){
            return res.json({
                error:err
            })
        }
        res.json(post)
    })
    
};

exports.getPost = (req,res)=>{
    const Alluser = Post.find().
    then( Alluser =>{
        res.json(Alluser)
    })
    .catch(err =>{
        res.json(err)
    })
    
    
}