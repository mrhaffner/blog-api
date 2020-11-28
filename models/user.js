const bcrypt = require('bcrypt');//maybe change to bcrypt js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxlength: 12, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre(//maybe change to bcrypt js
    'save',
    async function(next) {
        const user = this; //why isn't this used? should it be User?
        const hash = await bcrypt.hash(this.password, 10);
    
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

module.exports = mongoose.model('User', UserSchema); //point of failure?