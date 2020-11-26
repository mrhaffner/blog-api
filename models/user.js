const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxlength: 12, unique: true },
    password: { type: String, required: true },
});

// MessageSchema.virtual('url').get(function() {
//     //UPDATE ROUTE
//     return `/blah/message${this.id}`
// });

module.exports = mongoose.model('User', UserSchema);