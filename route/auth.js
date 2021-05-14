const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");


/*router.post("/register",(req,res) => {
    //console.log(req.body);
    //res.json({message:req.body});
    //res.send("register page");
    //console.log(req.body.name);
    //console.log(req.body.email);
    const { name, email, phone, work, password, cpassword } = req.body;
    //console.log(name);
    //data is filed or not
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error : "plz filled the value"});
    }
    //same user or not and not same user do data add
    User.findOne({email})
    .then((userExist) => {
        if(userExist){
            console.log("Email already Exist");
            return res.status(422).json({error : "Email already Exist"});
        }
            //create user instance
            const user = new User({ name, email, phone, work, password, cpassword });
            user.save().then(() => {
                res.status(201).json({message:"user registered successfuly"});
            }).catch((e) => {
                res.status(500).json({error:"Failed to registered"});
                console.log(e);
            });

    }).catch((e) => {
        console.log(e);
    });

});*/

router.post("/register", async (req,res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    //console.log(name);
    //data is filed or not
    if(!name || !email || !phone || !work || !password || !cpassword){
        console.log(`user fill not all value`);
        return res.status(422).json({error : "plz filled the value"});
    }
    //same user or not and not same user do data add
    try {
        const  userExist = await User.findOne({email});
        if(userExist){
            console.log("same user try to register");
            return res.status(422).json({error : "Email already Exist"});
        }else if (password != cpassword) {
            return res.status(422).json({error : "password is not matching"});
        }else{
            const user = new User({ name, email, phone, work, password, cpassword });
            const userRegister =  await user.save();
            if (userRegister) {
                console.log(`new user registered`);
                res.status(201).json({message:"user registered successfuly"});
            }else{
                console.log(`Failed to registered`);
                res.status(500).json({error:"Failed to registered"});
            }
        }
    } catch (e) {
        console.log(e);
    }
      
});

router.post("/login",async (req,res)=> {
    //console.log(req.body);
    //res.json({message:"data recived"});
    try {
        const {email,password} = req.body;
        if( !email || !password ){
            return res.status(400).json({error:"plz fild the data"});
        }
        
        const userLogin = await User.findOne({email});

        if (userLogin) {
            const matchPass = await bcrypt.compare(password,userLogin.password);//database password,user give password
            
            if(!matchPass){
                res.status(400).json({ error : " user error p"});
            }else{
                const token = await userLogin.generateAuthToken();//password match then generate token
                res.cookie("jwt",token,{
                    expires:new Date(Date.now() + 2589200000 ),
                    httpOnly:true 
                });
                res.status(200).json({message : " user signin successfully"});
            }
        }else{
            res.status(400).json({ error : " user error all"});
        }

    } catch (error) {
        console.log(error);
    }
});

router.get("/about", authenticate ,(req,res) => {
    console.log(`hello my about`);
    //res.send("hello about from server side");
    res.send(req.rootUser);
});

// only get data for contact page
router.get("/getData",authenticate,(req,res)=>{
    console.log(`getData page`);
    res.send(req.rootUser);
});

router.post('/contact', authenticate , async (req, res) => {
   try {
       const {name,email,phone,message} = req.body;
       if(!name || !email || !phone || !message){
           console.log("plx filled the data");
        return res.json({error:"plx filled the data"})
       }

       const userContact = await User.findOne({ _id: req.userID });

       if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({message:"user contact successfully"});   
       }
   } catch (error) {
       console.log(error);
   }
});

//logout

router.get("/logout" ,(req,res) => {
    console.log(`hello my logout`);
    //res.clearCookie("jwt",{path:"/"});
    res.cookie('jwt','',{maxAge:1});
    res.status(200).send('user logout');
});

module.exports = router;