const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    author: String,
    tweet: String,
    date: Date,
    mentions: [String]
});
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
