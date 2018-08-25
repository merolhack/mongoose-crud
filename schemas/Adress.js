const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    number: Number,
    pc: Number
});

module.exports = addressSchema;
