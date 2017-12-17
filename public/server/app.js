const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const contactRouter = require('./contact.router.js');

app.use(express.static('public/view'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//contact router
app.use('/contact', contactRouter);

app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
});