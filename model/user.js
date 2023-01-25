const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
        
    firstName:{
        type:String,
        default:null
    },
    lastNmae:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    token:{
        type:string
    }
})

module.exports= mongoose.model("user", userSchema)