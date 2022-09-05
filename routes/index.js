const router = require('express').Router();
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/notes/api', function (req, res) {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.get('/keith', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/keith.html'));
});

router.post('/notes/api', (req, res) => {  
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

  module.exports = router;