const asynchandler =require('express-async-handler');
const User = require("../models/userModel");
const jwt =require("jsonwebtoken");
const bcrypt= require("bcrypt")
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asynchandler(async(req, res)=>{
    const {username, email, password}=req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }

    const userAvailable= await User.findOne({email });

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }

    // hash password

    const hashPassword =await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashPassword);

    const user =await User.create({
        username,
        email,
        password:hashPassword
    });
    console.log(`User created ${user}`);

    if(user){
        res.status(201).json({_id: user.id, email: user.email});

    }else{
        res.status(400);
        throw new Error("User data us not valid");
    }



    res.status(200).json({message: "Register user"});


});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asynchandler(async(req, res)=>{
    const {email, password}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email});

    // compare password with hashe password

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: "1m"});
        
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid")
    }

  


});

//@desc Current user info
//@route POST /api/users/current
//@access private

const currentUser = asynchandler(async(req, res)=>{

    res.status(200).json({message: "Register user"});


});

module.exports ={registerUser, loginUser, currentUser}