const express = require('express')
const app = express()
const PORT = 3000;

app.use(express.static('public'));
app.use(require('./routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/notes/api', (req, res) => {  
    const { title, text } = req.body;
  
    if (title && text) {
      console.log('Yes!!');
      const newNote = {
        title,
        text,
      }
  
      const response = {
        status: 'success',
        body: newNote,
      }
  
      res.status(201).json(response);
    } else {
      console.log('Noooooooooooo!')
      res.status(500).json('Error in posting reveiw');
    }
  });

app.listen(PORT,()=>console.log(`Now listing on http://localhost:${PORT}`));