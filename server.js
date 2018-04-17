// server.js
// where your node app starts

// init project
require("dotenv").config();
var express = require('express');
var app = express();
var db = null;
var collection = null;

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/new/:url", function (request, response) {
  collection.insertOne({ url: request.params.url });
});

// listen for requests :)
MongoClient.connect(process.env.MONGO_URL, function (err, database) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = database;
  collection = db.collection('urls');
  var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
});
