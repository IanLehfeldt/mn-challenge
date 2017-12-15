const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
    
});