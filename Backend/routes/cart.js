import express from 'express'
import user from '../models/user.js'
import books from '../models/book.js'
import authentication from './auth.js'

const router = express.Router();

router.put("/add-to-cart",authentication,async(req,res)=>{
    try {
        const {bookid,id} = req.headers
        const userData= await user.findById(id)
        const isBookCart=userData.cart.includes(bookid)
        if(isBookCart){
            return res.status(200).json({
                message:"Book is already in cart."
            })
        }
        await user.findByIdAndUpdate(id,{$push:{cart:bookid}})
        return res.status(200).json({
            success:true,
            message:"Book added to cart"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.put("/del-to-cart/:bookid",authentication,async(req,res)=>{
    try {
        const {id} = req.headers
        const {bookid}=req.params
        await user.findByIdAndUpdate(id,{$pull:{cart:bookid}})
  
            return res.status(200).json({
                message:"Book removed from cart."
            })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.get("/get-user-cart",authentication,async(req,res)=>{
    try {
        const {id}=req.headers
        const userData=await user.findById(id).populate("cart")
        const cart=userData.cart.reverse()
        if(userData){
            return res.status(200).json({
                success:true,
                cart
            })
        }
        
        res.status(200).json({
            message:"First add books to cart"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

export default router;