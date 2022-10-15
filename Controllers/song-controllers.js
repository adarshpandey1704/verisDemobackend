const Song = require('../models/song-model');
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

const fs =require('fs');

const list = async (req,res,next) => {
    
    let allSongs;

    try{
        allSongs = await Song.find({});
    }
    catch(err)
    {
        console.log(err);
    }

    if(!allSongs)
    {
        return res.json({
            "message" : "No songs found!"
        })
    }

    res.json({allSongs: allSongs.map(song => song.toObject({getters:true}))});
}

const details = async (req,res,next) => {
    let song;
    let songId = req.params.songId;
    try{
        song = await Song.findById(songId);
        return res.json(song);
    }
    catch(err)
    {
        return next(err);
    }
}

const like = async (req,res,next) => {
    const userId = req.userData.userId;
    const songId = req.params.songId;
 
    let exisistingUser;
    try
    {
     exisistingUser = await User.findById(userId);
     if(!exisistingUser)
     {
         return next(new HttpError(
             "Cant find user for specified ID!",
             404
         ));
     }
 
     if(exisistingUser.likedSongs.includes(songId))
     {
         return res.json({
             "message" : "Already in liked songs!"
         });
     }
     else{
         await exisistingUser.likedSongs.push(songId);
         await exisistingUser.save();
         return res.json({
             "message": "Added to liked Songs!"
         })
     }
    }
    catch(err)
    {
     return next(err);
    }
 
}
 
const dislike = async (req,res,next) => {
    const userId = req.userData.userId;
    const songId = req.params.songId;
 
    let exisistingUser;
    try
    {
     exisistingUser = await User.findById(userId);
     if(!exisistingUser)
     {
         return next(new HttpError(
             "Cant find user for specified ID!",
             404
         ));
     }
 
     if(!exisistingUser.likedSongs.includes(songId))
     {
         return res.json({
             "message" : "Not found in liked songs!"
         });
     }
     else{
         await exisistingUser.likedSongs.pull(songId);
         await exisistingUser.save();
         return res.json({
             "message": "Removed liked Songs!"
         })
     }
    }
    catch(err)
    {
     return next(err);
    }
 
}
 
 const likedsongs = async (req, res, next) => {
    const userId = req.userData.userId;
     
    let likedSongs;
    let user;
    let songs = [];
    try{
        user = await User.findById(userId);
        console.log(user);
        likedSongs = user.likedSongs;
        console.log(likedSongs);
        for(i=0; i<likedSongs.length; i++)
        {
            songs.push(await Song.findById(likedSongs[i]));
        }
        return res.json({songs : songs.map(song => song.toObject())});
    }
     catch(err)
    {
        return next(err);
    }
}

const add = async (req,res,next) => {
    const {name, singer, release_date, album, movie} = req.body;
    const createdSong = new Song({
        name,
        singer,
        release_date,
        album,
        movie,
    });

    try{
        createdSong.save();
    }
    catch(err)
    {
        return res.json({
            "message" : "Cant create song"
        })
    }

    res.json({
        "message" : "song created"
    })
}

const addpath = async (req,res,next) => {
    const SongId = req.params.songId;

    let song;
    try{
        song = await Song.findById(SongId);
        await song.file.replace(req.file.path);
        console.log(song.file);
        await song.save();
        res.json(
            {
                "message" : "File added to server succesfully!"
            }
        )
    }
    catch(err)
    {
        res.json({
            "message" : "Something went wrong!"
        })
    }
}

const deleteSong = async (req,res,next) => {
    const songId = req.params.songId;
 
    let song;
    try{
        song = await Song.findById(songId);
 
        if(!song)
        {
            return next(new HttpError(
                "Song not found!",
                404
            ));
         }
 
        await Song.findByIdAndDelete(songId);
        return res.json({
            song,
            message : "Song deletd successfully!"
        })
    }
    catch(err)
    {
        return next(err);
    }
}
 
 exports.add = add;
 exports.list = list;
 exports.details = details;
 exports.like = like;
 exports.dislike = dislike;
 exports.likedsongs = likedsongs;
 exports.deletesong = deleteSong;
exports.addpath = addpath;