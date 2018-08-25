const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = require('./Adress');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: Address
});
const User = mongoose.model('User', userSchema);

module.exports = User;
