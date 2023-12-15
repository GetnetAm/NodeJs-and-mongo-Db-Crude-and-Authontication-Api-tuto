const express = require("express");


const {registerUser, loginUser, currentUser} =require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router=express.Router();

router.post("/register",validateToken, registerUser).post("/login", loginUser).post("/current",currentUser);





module.exports=router;