const express = require("express"); 
const app = express(); 
app.use(express.static(__dirname + "/public"));
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'data.json');

app.post('/save-data', (req, res) => {
  const newData = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error saving data.' });
    }
    
    const existingData = JSON.parse(data);
   
    //console.log(existingData);
    existingData.push(newData);

    fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ message: 'Error saving data.' });
      }
      console.log('Data saved to file successfully.');
      res.json({ message: 'Data saved successfully.' });
    });
  });
});
  
// A simple get greet method 
app.get("/greet", (req, res) => { 
    // get the passed query 
    const { name } = req.query; 
    res.send({ msg: `Welcome ${name}!` }); 
}); 
  
// export the app for vercel serverless functions 

module.exports = app;
