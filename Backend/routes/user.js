import express from 'express';
import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import authentication from './auth.js';


const router = express.Router();

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        // console.log(req.body)
        if (username.length < 4) {
            return res.status(400).json({
                message: "Username length should be greater than 4"
            });
        }

        const isUsername = await user.findOne({ username: username });
        if (isUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const isEmail = await user.findOne({ email: email });
        if (isEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be more than 8 characters"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            username,
            email,
            password: hashPassword,
            address
        });
        console.log("Hey")

        await newUser.save();

        res.status(201).json({
            message: "User sign-up successful"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if user exists
      const isUser = await user.findOne({ email });
      if (!isUser) {
        return res.status(400).json({
          success: false,
          message: 'User does not exist, please register.',
        });
      }
  
      // Compare the password
      const isPasswordMatch = await bcrypt.compare(password, isUser.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Password doesn't match",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign({ _id: isUser._id }, process.env.KEY, {
        expiresIn: '90d', // Token will expire in 90 days
      });
  
      // Set token in the cookies
      res
        .status(200)
        .json({
          success: true,
          message: 'User logged in successfully',
          user: isUser,
          token,
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

router.get("/get-user-information",authentication,async(req,res)=>{
    try {
        const {id} = req.headers
        const data = await user.findById(id).select("-password")
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.put("/update-address",authentication,async(req,res)=>{
    try {
        const {id}=req.headers
        const {address} = req.body
        await user.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({
            message:"Address updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

router.post('/logout', authentication, async (req, res) => {
    try {
      const { id } = req.headers;
      console.log(id);
  
      const isUser = await user.findById(id);
  
      if (isUser) {
        return res.status(200).json({ message: 'Logged out successfully' });
      }
  
      res.status(404).json({
        message: 'User not found',
      });
  
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });
  

export default router;
