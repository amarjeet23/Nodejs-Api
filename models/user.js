const mongoose  = require('mongoose')
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
uuidv4();
console.log(uuidv4());
const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:{
        type:Date,
        default:Date.now
    }

})

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

// method

userSchema.methods = {
    authenticate: function(plaintext){
        return this.encryptPassword(plaintext)===this.hashed_password

    } ,
    encryptPassword:function(password){
        if(!password) return "";
        try{
            return crypto.createHmac("sha256", this.salt)
                   .update(password)
                   .digest('hex');
        }
        catch(err){
            return "";
        }
    }
      
}
// userSchema.plugin(passportLocalMongoose);
module.exports = User = mongoose.model("User",userSchema);
