const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser");

const JWT_SECRET = "Guptag";

//Router 1:- Create a user using :POST "/api/auth/createuser" || NO login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password should contain min 5 chars").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });

    try {
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user will this email already exits" });
      }


      //Here we are using bcrypt for hashing the password 
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // .then(user=>res.json(user))
      // .catch(err=>{console.log(err);
      // res.json({error:"Please enter a unique value for email.",message:err.message})});

      // console.log(req.body);

      //Here we are json web token which helps us to know whether user has change his details or not or can say matching the data that sent and receive
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured in auth");
    }
  }
);


//Router 2:-Authenticate user with credentials using :POST "/api/auth/login" || Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
      let success=false;
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please login with correct credentials"});
      }

      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success,error:"Please login with correct credentials"});
      }

      //Here we are json web token which helps us to know whether user has change his details or not or can say matching the data that sent and receive
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }

  });


//Router 3:-Get details of Authenticated user using :POST "/api/auth/getuser" || Login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
}

})
module.exports = router;
