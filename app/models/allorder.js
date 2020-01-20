var mongoose = require("mongoose");
const allorderSchema = new mongoose.Schema({
    allordername : String,
    allorderprice : Number,
    token : Number
});

module.exports=mongoose.model("allOrder", allorderSchema);