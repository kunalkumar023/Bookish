import express from 'express';
import user from '../models/user.js';  // Capitalize model names for better convention
import Book from '../models/book.js';
import order from '../models/order.js';  // Ensure the correct order model is imported
import authentication from './auth.js';

const router = express.Router();

router.post("/place-order", authentication, async (req, res) => {
  try {
    const { id } = req.headers;  // User ID from headers
    const { orderItems } = req.body;  // Expect order items in request body
    console.log(orderItems);

    for (const orderData of orderItems) {
      // Create a new order for each book in the cart
      const newOrder = new order({
        user: id, 
        book: orderData._id  // Order refers to the book ID
      });
      
      // Save the order in the database
      const orderDataFromDb = await newOrder.save();

      // Update the user's orders by adding the order ID
      await user.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

      // Remove the ordered book from the user's cart
      await user.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }

    // Respond with success message
    return res.status(200).json({
      message: "Order placed successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});



router.get("/get-user-orders", authentication, async (req, res) => {
    try {
      const { id } = req.headers;  // Get the user ID from the headers
      
      // Find the user and populate the 'orders' field, and inside it populate the 'book' field
      const userData = await user.findById(id).populate({
        path: "orders",
        populate: { path: "book" }
      });
  
      if (!userData) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
  
      const orders = userData.orders.reverse(); // Reverse orders to show latest first
      
      // If no orders are present
      if (orders.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No orders found",
          orders: []
        });
      }
  
      // If orders are found, send them in the response
      return res.status(200).json({
        success: true,
        orders
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

router.get("/get-all-orders",authentication,async(req,res)=>{
    try {
        
        const userData=await order.findById(id).populate({path:"book"}).populate({path:"user"}).sort({createdAt:-1})
  
            res.status(200).json({
                success:true,
                userData
          
        })
        
        res.status(200).json({
            message:"No orders"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.put("/update-status/:id",authentication,async(req,res)=>{
    try {
        const {id}=req.params
        await order.findByIdAndUpdate(id,{status:req.body.status})
        return res.status(200).json({
            message:"status updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

export default router