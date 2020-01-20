var alert = require("alert-node");

module.exports=function(app){
var Food = require("./models/food.js");
var Order = require("./models/order.js");
var Allorder = require("./models/allorder.js");
//variables for datbase trasfer

var foodinputname;
var foodinputprice; 
var orderfoodinputname;
var orderfoodinputprice;
var Token = 0 ;
var ordertransfername;
var ordertransferprice;

    app.get("/",(req,res)=>{
        Food.find({},function(err,food){
            if(err){
                console.log(err);
            }else{
                res.render("index",{ food : food });
            }
        });
        
    });

    app.get("/cart",(req,res)=>{
        Order.find({},function(err,orders){
            if(err){
                console.log(err);
            }else{
                res.render("cart" , {order : orders });
            }
        });
        
    });




app.get("/out",function(req,res){
    Token = Token + 1;
    Order.find(function(err,order){
        if(err){
            console.log("err");
        }else{
            order.forEach(function(order){
                ordertransfername = order.ordername;
                ordertransferprice = order.orderprice;
    
                var allorder = new Allorder({
                    allordername : ordertransfername,
                    allorderprice : ordertransferprice,
                    token : Token
                })
                allorder.save(function(err){
                    if(err){
                        console.log(err);
                }else{
                    console.log("saved to allorders");
                    res.render("checkout" , { token : Token });
                }
                })
            })
        }
   
        
    })
});
    

    app.get("/admin",(req,res)=>{
        res.render("admin");
    });

    app.get("/food",(req,res)=>{
        res.render("food")
    });

    app.post("/food",(req,res)=>{
        foodinputname = req.body.foodname;
        foodinputprice = req.body.foodprice;
        
        var food = new Food({
            name : foodinputname,
            price : foodinputprice
            
        });

        food.save(function(err){
            if(err){
                console.log(err);
            }else{
                alert("food is added in database");
                res.redirect("food");
            }
        });
    });

    app.get("/allorders",(req,res)=>{
        res.render("allorders")
    });

    app.get("/stock",(req,res)=>{
        res.render("stock");
    });

    app.get("/:id",(req,res)=>{
        Food.findById(req.params.id,function(err,Foods){
            orderfoodinputname = Foods.name;
            orderfoodinputprice = Foods.price;

            var order = new Order({
                ordername : orderfoodinputname,
                orderprice : orderfoodinputprice
            })

            order.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("data successfully added to orders");
                    alert("added");
                    res.redirect("/");
                }
            });

        });
    });


    app.delete("/:id",(req,res)=>{
        Order.findByIdAndRemove(req.params.id,function(err){
            if(err){
                console.log(err);
            }else{
                console.log("deleted");
                res.redirect("/cart");
            }
        })
    });

  
 
};