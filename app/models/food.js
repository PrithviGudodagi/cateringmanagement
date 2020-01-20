var mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    name : String,
    price : Number
});

module.exports=mongoose.model("Food", foodSchema);