const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true, maxlength: 150 },
    date: { type: Date, default: Date.now },
    author: { type: String, required: true, minlength: 3, maxlength: 20 },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    //post: { type: String }
});

module.exports = mongoose.model('Comment', CommentSchema);