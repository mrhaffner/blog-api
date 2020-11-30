const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 40, unique: true },
    text: { type: String, required: true, maxlength: 150 },
    date: { type: Date, required: true },
    isPublished: { type: Boolean, default: false }
});

// PostSchema.virtual('hyphenTitle').get(function() {
//     return this.title.toLowerCase().split(' ').join('-')
// })

// MessageSchema.virtual('url').get(function() {
//     //UPDATE ROUTE
//     return `/blah/message${this.id}`
// });

module.exports = mongoose.model('Post', PostSchema);