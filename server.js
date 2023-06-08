//import express
const express = require('express');
const app = express(); //creating an instance of Express.js in the current directory.
//import body parser
const bodyParser = require('body-parser'); //body-parser is a middleware that parses incoming request data. Learn more about it [here](  https://github.com/expressjs/body-parser ).  It is a middleware and not a part of Express.js.  It is also not part of any library.
//send a variable to the index.html file?
app.use(express.static('public')); //this is a middleware that tells the server to look for static files in the public folder.
app.use(express.static('resources')); //this is a middleware that tells the server to look for static files in the public folder.

//request response
app.get('/',function(req,res){
   //send index.html as response
   res.sendFile(__dirname+'public/index.html');
});
app.listen(3000,function(){
   console.log('Server started on port 3000');
});



