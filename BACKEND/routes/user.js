const router = require('express').Router();
let User = require('../models/user');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'librarymanagementsystem';


const app = express();
app.use(express.json());
app.use(cors());



//create - user registration(Sign UP)
router.route('/create').post(async (req, res) => {
    const { FullName, Email, Phone, Address, Password, UserType } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            FullName,
            Email,
            Phone,
            Address,
            Password: hashedPassword,
            UserType,
        });

        // Save the user after hashing
        await newUser.save();

        res.json('User added!');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

//reading user 
router.route("/getAllUser").get(async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

//updating user 
router.route('/update/:id').put(async(req,res)=>{
    let userId = req.params.id;
    const {FullName,Email,Phone,Address,Password}
    = req.body;

    const updateUser = {
        FullName,
        Email,
        Phone,
        Address,
        Password
        }

    const update = await User.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status: "User updated!"})
    }).catch((err)=>
        {console.log(err);
            res.status(500).send({status: "Error with updating data!", error:err.message});
    })

})



//deleting user 
router.route("/deleteUser").post(async (req, res) => {
  try {
    const { userid } = req.body;
    const deletedUser = await User.deleteOne({ _id: userid });
    res.send({ status: "Ok", data: { _id: deletedUser._id, name: deletedUser.name } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});




//read one user
router.route('/readOne/:id').get(async (req,res)=>{
    let userId = req.params.id;
    const user = await User.findById(userId).then((user)=>{
        res.status(200).send({status: "User fetched!", user:user})
    }).catch((err)=>{console.log(err);
        res.status(500).send({status: "Error with get user!", error:err.message});
    })
})

//Login
router.route('/Login').post((req, res) => {
    const { Email, Password } = req.body;
  
    User.findOne({ Email: Email })
      .then(user => {
        if (user) {
          bcrypt.compare(Password, user.Password)
            .then(result => {
              if (result) {

                // Generate JWT token
                const token = jwt.sign({ userId: user._id, userType: user.UserType }, JWT_SECRET, { expiresIn: '1h' }); // Customize expiration time


                res.json({ status: "User Logged in", user: user, token: token, userType: user.UserType });
              } else {
                res.json({ status: "Password did not match!" });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: 'Error comparing password' });
            });
        } else {
          res.json({ status: "User not found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error finding user' });
      });
  });


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Token:', token); // Log token to check its value
  
    jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, decoded) => {
      console.log('Decoded:', decoded); // Log decoded to check its value
  
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };
  

// Protected route for fetching user details (UserProfile)
router.route('/UserProfile').get(verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      res.json({ status: 'User fetched!', user: user });
    } else {
      res.status(404).json({ status: 'User not found!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Error fetching user!', error: err.message });
  }
});
  




module.exports = router;



