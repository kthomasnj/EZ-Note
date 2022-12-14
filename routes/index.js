const router = require('express').Router();
const path = require('path');
const fs = require('fs');
// const id = {};
const displayRequests = (req, res, next) => {
    const green = '\x1b[32m%s\x1b[0m';
    console.log(green, `${req.method} request to ${req.path}`);
    next();
};

// Middleware
router.use(displayRequests);


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/notes/api', function (req, res) {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.delete(`/notes/api/:id`, function (req, res) {
    const { id } = req.params;
    
    readAndDelete(id, './db/db.json');

});

router.post('/notes/api', (req, res) => {  
    const { title, text, id } = req.body;

    console.log(req.body);
  
    if (title && text && id) {
      const newNote = {
        title,
        text,
        id
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

  const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedDatas = JSON.parse(data);
            console.log(parsedDatas);
            const newParedDatas = [];
            for (let i = 0; i < parsedDatas.length; i++) {
              const parsedData = parsedDatas[i];
              if(parsedData.id != id) {
                newParedDatas.push(parsedData);
              }
            }
            
            writeToFile(file, newParedDatas);
        }
    })
  }
  

  const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  module.exports = router;