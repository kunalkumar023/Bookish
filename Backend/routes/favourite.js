import express from 'express'
import user from '../models/user.js'
import authentication from './auth.js'

const router = express.Router();

router.put("/add-to-fav",authentication,async(req,res)=>{
    try {
        const {bookid,id}=req.headers
        
        const userData=await user.findById(id)
        const isBookFav = userData.fav.includes(bookid)

        if(isBookFav){
            return res.status(200).json({
                message:"Book is already in favourites"
            })
        }
        await user.findByIdAndUpdate(id,{$push:{fav:bookid}})
        res.status(200).json({
            message:"Book is added to favourites"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.put("/del-to-fav", authentication, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        
        // Check if the book is already in the favorites
        const isBookFav = userData.fav.includes(bookid);
        
        if (isBookFav) {
            // Remove the book from the user's favorites
            await user.findByIdAndUpdate(id, { $pull: { fav: bookid } });
            return res.status(200).json({
                message: "Book is removed from favourites"
            });
        } else {
            return res.status(404).json({
                message: "Book is not in favorites"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


//get all the favourite books
router.get("/get-all-fav",authentication,async(req,res)=>{
    try {
        const {id}=req.headers
        const userData=await user.findById(id).populate("fav")
        const favBooks=userData.fav
        if(userData){
           return res.status(200).json({
                success:true,
                favBooks
            })
        }
        
        res.status(200).json({
            message:"First add books to favourites"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})






export default router