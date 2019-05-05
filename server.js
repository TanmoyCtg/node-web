'use strict';

const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');




app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  // third param is a callbac func
  fs.appendFile('server.log', log+'\n', (err)=>{
    if (err){
      console.log('Unable to append to server.log');
      
    }
  })
  
  
  next();
})

// app.use((req, res, next)=>{
//   res.render('maintainence.hbs');
//   next();
// })

app.use(express.static(__dirname + '/public'));


// hbs middleware
hbs.registerHelper('FullYear', ()=>{
  return new Date().getDay();
});

hbs.registerHelper('prolifc', (text)=>{
  return text.toUpperCase();
});


app.get('/', (req, res)=>{
  res.render('home.hbs', {
      pageTitle: 'Iftekhar Joy ',
      currentYear: new Date().getFullYear(),
      desc: 'Welcome! I Work in prolific analytics'    
  
  });
});

// app.get('/maintainence', (req, res)=>{
//   res.render('maintainence.hbs', {
//     pageTitle: 'Maintainence',
//     desc: 'Currently working on the website'

//   });
// });




app.get('/about', (req,res)=>{
  res.render('about.hbs',{
      pageTitle: 'About page',
      currentYear: new Date().getFullYear(),
      desc: 'Profilic about paage'
  });
});

app.get('/project', (req,res)=>{
  res.render('project.hbs',{
      pageTitle: 'project',
      desc: 'Follow my github profile',
      link: "tanmoyctg"
  });
});

app.get('/bad', (req, res)=>{
  res.send({
      error: 'error status code'

  })
  
})


// Constants
const port = process.env.PORT || 8080;
const HOST = '0.0.0.0';



app.listen(port, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);



