const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 40 },
    text: { type: String, required: true, maxlength: 150 },
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false }
});

// MessageSchema.virtual('url').get(function() {
//     //UPDATE ROUTE
//     return `/blah/message${this.id}`
// });

module.exports = mongoose.model('Post', PostSchema);