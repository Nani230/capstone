const mongoose  = require('mongoose')

// user schema
const schema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
   
})

let usermodal = new mongoose.model("users",schema)


module.exports = usermodal