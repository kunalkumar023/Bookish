import express from 'express'
import user from '../models/user.js'
import books from '../models/book.js'
import authentication from './auth.js'

const router = express.Router();

router.post("/add-book",authentication,async(req,res)=>{
    try {
    
        // const isUser=await user.findById(req.user._id)
        // if(user.role!=="user"){
        //     return res.status(400).json({message:"You don't have this access"})
        // }

        
        const book=new books({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            lang:req.body.lang 
        })

        await book.save()
        return res.status(200).json({
            message:"Book added successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.put("/update-book",authentication,async(req,res)=>{
    try {
        const {bookid}=req.headers
        await user.findById(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            lang:req.body.lang 
        })

        return res.status(200).json({
            message:"Book updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.delete("/delete-book",authentication,async(req,res)=>{
    try {
        const {bookid}=req.headers
        await user.findByIdAndDelete(bookid)

        return res.status(200).json({
            message:"Book deleted successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.get("/get-all-books",async(req,res)=>{
    try {
        const allBooks=await books.find().sort({createdAt:-1})
        return res.status(200).json({
            status:"Success",
            data:allBooks
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})

router.get("/get-recent-books",async(req,res)=>{
    try {
        const recentBooks=await books.find().sort({createdAt:-1}).limit(4)
        return res.status(200).json({
            status:"Success",
            data:recentBooks
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})

//get book by id
router.get("/get-book/:id",async(req,res)=>{
    try {
        const bookid=req.params

        const book=await books.findById(bookid.id)
        return res.status(200).json({
            status:"Success",
            data:book
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})

export default router