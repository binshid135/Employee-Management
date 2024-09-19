const mongoose=require('mongoose')

const adminschema=new mongoose.Schema({
    email:String,
    password:String,
    username:String
})

const Admin=mongoose.model('admin',adminschema)
module.exports=Admin