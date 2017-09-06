var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Restaurant = require('./models/ground.js');
// // var bootstrap = require('bootstrap');

mongoose.connect("mongodb://localhost/food_db");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




// Restaurant.create(


//     {name: "Mama Lokoja", image:"https://scontent.flos3-1.fna.fbcdn.net/v/t1.0-1/p160x160/20767815_1577821268935675_1650698914966330585_n.jpg?_nc_eui2=v1%3AAeFu6tl94dolWmOLddc6bBX126ntjmrFBRbMOSPLhqaJkNJBzr-GZotQhnAazP5DSbdqRcsHm5ZFO24epDfeBByUmYftqfsBHjGkanAfOQ47Gw&oh=20c5bb7fe50a75b4bc2f88cc9e6781e8&oe=5A37CF0D",
//     description: "This is a brief description"
// }, function(err, restaurant){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("New Food Site: ");
//             console.log(restaurant);
//         }
//     }
// );



app.get("/", function(req, res){
    res.render("landing");
});


// Index Route
app.get("/restaurants", function(req,res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        }else{
             res.render("index", {restaurants:allRestaurants});
        }
    });
   
});


//Create Route
app.post("/restaurants", function(req, res){
var name = req.body.name;
var image = req.body.image;
var desc = req.body.description;
var newRestaurant = {name: name, image:image, description:desc}
//New Restaurant for Database
Restaurant.create(newRestaurant, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
        res.redirect("/restaurants");
    }
 
});


});

//New Route
app.get("/restaurants/new", function(req, res){
    res.render("new.ejs");
});


//Show Route
app.get("/restaurants/:id", function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if(err){
            console.log(err);
        } else{
            res.render("show", {restaurant: foundRestaurant});
        }
    });
    
});


app.listen(3000, function () {
  console.log('Our Site is on Port 3000');
});