const express = require('express')
const app = express()
const PORT = 3000;
const fs = require('fs');

app.use(express.static('public'));
app.use(require('./routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('pulic'));

app.post('/notes/api', (req, res) => {  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
      }
  
      const response = {
        status: 'success',
        body: newNote,
      }

      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);

    } else {      
      res.status(500).json('Error in posting reveiw');
    }
  });

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
  }

  const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

app.listen(PORT,()=>console.log(`Now listing on http://localhost:${PORT}`));