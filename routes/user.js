const express = require("express");
const router = express.Router()

// Controllers
const {userById,allUsers,getUser,updateUser,deleteUser} = require('../controllers/user')
const {requireSignin,} = require('../controllers/Auth')

// express validator
const { check} = require('express-validator');





router.get("/users",allUsers)
router.get("/user/:userId",requireSignin,getUser)
router.put("/user/:userId",requireSignin,updateUser)
router.delete("/user/:userId",requireSignin,deleteUser)

// Any route containing  :userid  our app will first execute userById
router.param("userId",userById)


module.exports = router;