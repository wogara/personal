var express = require('express');

var app = express();



app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.render("home");
});

app.get("/patatap",function(req,res){
    res.render("circles");
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
