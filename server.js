//For server to run we need express package; Enables express package
const express = require('express');

// Runs the express app
const app = express();
const port = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use(require('./routes'));



app.listen(PORT,()=>console.log(`Now listing on http://localhost:${PORT}`));