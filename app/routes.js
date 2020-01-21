

module.exports=function(app){

    
var foodinputname;
var foodinputprice; 
var orderfoodinputname;
var orderfoodinputprice;
var Token = 0 ;
var ordertransfername;
var ordertransferprice;
    
var Food = require("./models/food.js");
var Order = require("./models/order.js");
var Allorder = require("./models/allorder.js");

app.get("/",function(req,res){
    
    res.render("main");
});

    app.get("/index",function(req,res){

        Food.find({},function(err,food){
            if(err){
                console.log(err);
            }else{
                res.render("index",{ food : food });
            }
        });
        
    });
    

    app.get("/cart",function(req,res){
        Order.find({},function(err,orders){
            if(err){
                console.log(err);
            }else{
                res.render("cart" , {order : orders });
            }
        });
        
    });

  



app.get("/out",(req,res)=>{
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
                  
                }
                })
            });
        }
   
        
    });
    Order.find({},(err,orders)=>{
        orders.forEach(function(order){
            order.remove();
            console.log("deleted successfully orders");
        })
    })
    res.render("checkout" , { token : Token });
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
                console.log("food is added in database");
                res.redirect("food");
            }
        });
    });


    app.get("/allorders",(req,res)=>{
        Allorder.find({},(err,allorder)=>{
            allorder.forEach(function(err,order){
                if(err){
                    console.log(err);
                }else{
                    console.log("displyed all orders successfully");
                }
                
            })
            res.render("allorders",{allorder : allorder});
        })
      
    });

    app.get("/orderscheck/:token",(req,res)=>{
        console.log(req.params.token);
        Allorder.find({token : req.params.token },(err,allorder)=>{
            if(err){
                console.log(err);
            }else{
                console.log("allorders displayed");
                
            }
            res.render("orderscheck",{ allorder : allorder });
        })
                
    });

    app.get("/stock",(req,res)=>{
        res.render("stock");
    });

    app.get("/index/:id",(req,res)=>{
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
                    res.redirect("/index");
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