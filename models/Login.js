const mongoose=require('mongoose')

const loginschema=new mongoose.Schema({
    email:String,
    password:String,
})

const Log=mongoose.model('login',loginschema)
module.exports=Log