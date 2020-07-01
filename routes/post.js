const express = require("express");
const router = express.Router()

// Controllers

const {getpost,createPost,getPost} = require('../controllers/post')
const {requireSignin} = require('../controllers/Auth')

const {userById} = require('../controllers/user')

// express validator
const { check} = require('express-validator');

router.get("/home",getpost)

router.post("/post",[
    // validation
    check('title').isLength({ min: 4 }).withMessage('title must be at least 5 chars long'),
    check('body').isLength({ min: 5 }).withMessage('body must be at least 5 chars long')
      
  ]
    
,requireSignin,createPost)

router.get("/allpost",requireSignin,getPost)

// Any route containing  :userid  our app will first execute userById
router.param("userId",userById)


module.exports = router;