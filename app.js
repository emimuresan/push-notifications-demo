const express = require('express');
const path = require('path');
const GCM_KEY = process.env.GCM_API_KEY;
const port = {
    HTTP: 8080,
    HTTPS: 8443
};
const fs = require('fs');
const http = require('http');
const https = require('https');
// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const api = require('./config/api.js');
const app = express();


console.log('--------- SERVER ---------');

if (!GCM_KEY) {
    console.log('Error: An environment variable with the Google Cloud Messaging API key is required');
}

const httpServer = http.createServer(app);
// let httpsServer = https.createServer(credentials, app);


// Set the public folder
app.use(express.static(__dirname + '/public'));


// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// Connect all our routes to our application
const routes = api(express, GCM_KEY);
app.use('/', routes);


// Start server
httpServer.listen(port.HTTP, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`http server is listening on ${port.HTTP}`);
});
// httpsServer.listen(port.HTTPS);
