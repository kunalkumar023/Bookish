import mongoose from "mongoose";

const conn = async()=>{
    try {
        await mongoose.connect(`${process.env.URI}`)
        console.log("Database is connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default conn