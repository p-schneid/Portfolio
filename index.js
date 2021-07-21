
  
var express = require("express");

var app = express();
var router = express.Router();
var viewPath = __dirname + '/views/';

const PATH = require('path');
const PORT = process.env.PORT || 5000;

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(viewPath + "software/software.html");
});

router.get("/software",function(req,res){
  res.sendFile(viewPath + "software/software.html");
});

router.get("/vr",function(req,res){
  res.sendFile(viewPath + "vr/vr.html");
});

router.get("/design",function(req,res){
  res.sendFile(viewPath + "design/design.html");
});

router.get("/tilt",function(req,res){
  res.sendFile(viewPath + "tilt/tilt.html");
});

app.use("/views", express.static(PATH.join(__dirname, 'views')))
app.use("/public", express.static(PATH.join(__dirname, 'public')))
app.use("/node_modules", express.static(PATH.join(__dirname, 'node_modules')))

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(viewPath + "404.html");
});

app.listen(PORT,function(){
  console.log("Live at Port " + PORT);
});
