const express = require("express"); 
const app = express(); 
app.use(express.static(__dirname + "/public"));
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'data.json');
  
// A simple get greet method 
app.get("/greet", (req, res) => { 
    // get the passed query 
    const { name } = req.query; 
    res.send({ msg: `Welcome ${name}!` }); 
}); 
  
// export the app for vercel serverless functions 

module.exports = app;
