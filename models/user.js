const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxlength: 12, unique: true },
    password: { type: String, required: true },
});


module.exports = mongoose.model('User', UserSchema); //point of failure?