import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        default:"https://imgs.search.brave.com/JUREPkVy5BaQNfhp1cNHrqH8bElEKYzc05D_64RBAtQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9wcm9maWxl/LWRlZmF1bHQtaWNv/bi01MTJ4NTExLXY0/c3c0bTI5LnBuZw"    
    },
    role:{
        type:String,
        default:"user",
        enum:['user','enum']  
    },
    fav:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books"
        }
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books"
        }
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"orders"
        }
    ]

},{timestamps:true})

const user = mongoose.model("user",userSchema)

export default user