const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {type:String, required:true},
    singer: {type:String, required:true},
    release_date: {type:String , required: true },
    album: {type:String },
    movie: {type:String},
    file: {type:String}
});

module.exports = mongoose.model('Song', songSchema);