require('dotenv').config()
const express =require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser')
var expressjwt = require('express-jwt');


// Middleware
app.use(bodyParser.json())
app.use(cookieParser())

// unauthorised error handling in protected route
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});


// Mongodb connection
mongoose.connect(process.env.connection, { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    console.log("db connected");
})
.catch( err =>{
    console.log(err);
})

// Require Routes

const post = require('./routes/post');
const auth = require('./routes/Auth');
const user = require('./routes/user');


// Routes

app.use("/",post)
app.use("/",auth)
app.use("/",user)


// Port Connection

const port = 4000
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
})