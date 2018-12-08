const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var year =new Date().getFullYear();
const  port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/Public'));

app.use((req,res,next)=>{
  var log =  Date().toString() +` ${req.method} ${req.url}`;
  fs.appendFile('Server.log',log+"\n",(err)=>{
    if(err){
      console.log("Error : Unable To append File!");
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('Maintainence.hbs',{
//     pageTitle:"Oops Sorry We are Working!"
//   })
// });

hbs.registerHelper('currentYear',()=>{
  return year
});

app.get('/', (req , res)=>{
  //res.send('<h1>Hello World!</h1>');
  res.render('Home.hbs',{
    pageTitle:'Welcome To Home'
  })
});
app.get('/about', (req , res)=>{
  res.render('about.hbs',{
    pageTitle:"Welcome To About"
  });
});
app.get('/bad', (req , res)=>{
  res.send({
    Error:'Unable To process!'
  });
});

app.listen(port,()=>{
  console.log("Here We start!");
});
