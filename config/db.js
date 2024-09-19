const mongoose=require('mongoose')
const env=require('dotenv')
env.config()
const mongodb_url=process.env.mongodb_url;


const db=async()=>{
    const con=await mongoose.connect(mongodb_url);
    console.log("connected")
}
module.exports=db