
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 5000;
var bodyparser =require('body-parser');
var mongoose = require('mongoose');
var methodoverride = require('method-override');

var configDB = require("./config/database.js");
mongoose.connect(configDB.url,{
    useNewUrlParser: true , useUnifiedTopology: true
});




app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.urlencoded({extended : true}))
app.use(methodoverride("_method"));

require("./app/routes.js")(app);

app.listen(port);
console.log('Hosted '+ port);