const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://uzma-altaf:multan@cluster0.ts4jzeu.mongodb.net/test"
module.exports = function () {
    mongoose.Promise = global.Promise;
    mongoose.set('strictQuery', true);
    const db = mongoose.connect(mongoDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    console.log('Successfully Connected To MongoDB.')
    mongoose.connection.on('error', (err) => {
        console.log(
            'Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red
        );
    });
    return db;
};