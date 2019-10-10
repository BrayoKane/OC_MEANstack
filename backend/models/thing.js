const mongoose = require('mongoose');

// creating a data schema which contains the fields we want for each Thing, their type, and whether or not they are a required field
const thingSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: { type: String, required: true},
    price: { type: Number, required: true},
});


// exporting that schema as a Mongoose model, making it available for our Express app
module.exports = mongoose.model('Thing', thingSchema);