const express = require("express");
const router = express.Router()

// Controllers

const {signup,signin,signout} = require('../controllers/Auth')
const {userById} = require('../controllers/user')


// express validator
const { check} = require('express-validator');



router.post("/signup",[
    // validation
    check('name').isLength({ min: 4 }).withMessage('name is required'),
    check('email').isEmail().withMessage('email must be required')
      
  ]
    
,signup)

router.post("/signin",signin)
router.get("/signout",signout)
 

// Any route containing  :userid  our app will first execute userById
router.param("userId",userById)


module.exports = router;