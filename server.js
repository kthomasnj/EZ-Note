//For server to run we need express package; Enables express package
const express = require('express');

// Runs the express app
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes'));



const fs = require('fs');
const middleware = (req, res, next) => {
    const green = '\x1b[32m%s\x1b[0m';
    console.log(green, `${req.method} request to ${req.path}`);
    next();
};


// Middleware
app.use(middleware);

app.use(express.static('pulic'));



app.listen(PORT,()=>console.log(`Now listing on http://localhost:${PORT}`));