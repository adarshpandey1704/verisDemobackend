const jwt = require('jsonwebtoken');

const User = require('../models/user-model');


const login = async (req,res,next)=>{
    const {email,password} = req.body;
    
    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }
    catch(err)
    {
        return res.json({
            "message" : "Some error occured!"
        })
    }

    if(!existingUser || existingUser.password!==password)
    {
        return res.json({
            "Credentials" : "Invalid"
        })
    }

    let token;
    try{
        token = jwt.sign({userId : existingUser.id, mail : existingUser.email, role : existingUser.role}, 
            "supersupersecret" ,
            {expiresIn:'1h'}
        );
    }
    catch(err)
    {
        res.json({
            err
        });
    }
    

    res.json({
        userId : existingUser.id,
        mail : existingUser.email,
        token : token
    });
}

const signup = async (req,res,next) => {
    const {name, email, password, role, likedSongs} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }
    catch(err)
    {
        return res.json({
            "message" : "Some error occured!"
        })
    }

    if(existingUser)
    {
        return res.json({
            "message": "User already exist"
        })
    }

    const createdUser = new User({
        name,
        email,
        password,
        role,
        likedSongs
    });

    try{
        await createdUser.save();
    }
    catch(err)
    {
        console.log(err);
        return res.json({
            "message":"sign up failed"
        })
    }

    
    let token;
    try{
        token = jwt.sign({userId : createdUser.id, mail : createdUser.email, role : createdUser.role}, 
            "supersupersecret" ,
            {expiresIn:'1h'}
        );
    }
    catch(err)
    {
        return res.json({
            "messagee" : "Sign Up failed please try again later."
        });
    }

    res.json({
        userId : createdUser.id,
        mail : createdUser.email,
        token : token
    });
}

const list = async (req,res,next) => {
    let users;

    try{
        users = await User.find({}, '-password');
    }
    catch(err)
    {
        return res.json({
            "message" : " Cant find users"
        })
    }

    res.json({users : users.map(user=>user.toObject({getters:true}))});
}

exports.signup = signup;
exports.login = login;
exports.list = list;