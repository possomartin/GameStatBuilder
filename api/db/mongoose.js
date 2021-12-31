/* File to handle database connection */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://localhost:27017/gamestat';

mongoose.connect(mongoUri, {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB Successfully");
}).catch((e) => {
    console.log("Error while establishing with MongoDB");
    console.log(e);
});

module.exports = {
    mongoose
};