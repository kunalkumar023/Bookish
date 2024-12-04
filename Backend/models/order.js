import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Out For Delivery","Delivered","Canceled"]
    }
},{timestamps:true})

const order = mongoose.model("orders",orderSchema)

export default order