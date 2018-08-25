const mongoose = require('mongoose');
const dbName = 'foo-bar';
mongoose.connect(`mongodb://localhost/${dbName}`);
const db = mongoose.connection;
module.exports = db;
