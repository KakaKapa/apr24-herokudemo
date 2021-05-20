const express = require('express');
const chalk = require('chalk');  //print message in color
const fs = require('fs');
var product = {};
var isUserLoggedIn = false;

var PORT = process.env.PORT || 8080;


const app = express();

fs.readFile('./data/product.json', function(err,data){
      if(err)
      {
           return err;
      }

       else                          
      {
           product = JSON.parse(data.toString());
      }; 
});



// starting server might take few sec
app.listen(PORT, function()
{
   console.log(chalk.bgGreen('Server started listening on port', PORT));
});


// middleware or tunnel
app.use(function(req,res,next)
{
    console.log(chalk.greenBright('REQUEST RECEIVED ON THIS DATE : ', new Date()));
    next();   // pass request to next handler
});

function validateUser(req,res,next)
{
     if(isUserLoggedIn)
     {
       next();   // control pass to next handler
     }
     else
     {
          res.sendFile(__dirname + '/login.html');     // sending a response
     }
}



// http://localhost:3000
app.get('/',(req,res) =>
{
    res.sendFile(__dirname + '/login.html');
    //res.send('<h1>WELCOME TO MY NODEJS APP</h1>');
    // res.end();
});

// http://localhost:3000/LOGIN
app.post('/login', function(req,res)
{
     isUserLoggedIn = true;
     res.sendFile(__dirname + '/home.html');
     //res.send('<h3>LOG IN SUCCESS!</h3>')
});

// http://localhost:3000/products
app.get('/invoice', validateUser, function(req,res)    //validateUser is a callback  handler
{
     res.download (__dirname + '/data/invoice.pdf');
});

app.get('/product', validateUser, function(req,res)    //validateUser,
{
     
    res.json(product);
});

console.log('********Program Ended*******');
