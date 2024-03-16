// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

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



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
// const port = process.env.PORT || 9001;
// app.listen(port, () => console.log(`Listening to port ${port}`));
