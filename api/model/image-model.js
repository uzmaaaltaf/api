
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var imageSchema = new Schema({
    image:{
        type: String
     }
});
const images = mongoose.model('Image', imageSchema)
module.exports = images;