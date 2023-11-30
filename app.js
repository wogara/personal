var express = require('express');
// enable ssl redirect

var app = express();

//function requireHTTPS(req, res, next) {
   //The 'x-forwarded-proto' check is for Heroku
//  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//    return res.redirect('https://' + req.get('host') + req.url);
//  }
//  next();
//}

//app.use(requireHTTPS);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.render("home");
});

app.get("/patatap",function(req,res){
    res.render("circles");
});

app.get("/pathfinder",function(req,res){
    res.render("grid");
});

app.get("/resume",function(req,res){
    res.render("resume");
});

app.get("/colorgame",function(req,res){
    res.render("colorGame");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("app listening on port 3000");
});
