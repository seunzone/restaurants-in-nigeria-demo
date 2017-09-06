

var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Restaurant", foodSchema);