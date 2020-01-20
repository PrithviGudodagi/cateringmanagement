var mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    ordername : String,
    orderprice : Number
});

module.exports=mongoose.model("Order", orderSchema);