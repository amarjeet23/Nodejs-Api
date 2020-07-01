const mongoose = require("mongoose")

const post = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:4
    },
    body:{
        type:String,
        required:true,
        minlength:5
    }
})

module.exports = mongoose.model("post",post);
