import mongoose, { mongo } from "mongoose";

const bookSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        requried:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String, 
        required:true
    },
    lang:{
        type:String,
        required:true
    }
},{timestamps:true})

const order = mongoose.model("books",bookSchema)

export default order