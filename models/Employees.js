const mongoose=require('mongoose')

const empschema=new mongoose.Schema({
    name:String,
    mail:String,
    mobile:Number,
    designation:String,
    gender:String,
    course:String,
    image:String
})

const Emp=mongoose.model('employee',empschema)
module.exports=Emp