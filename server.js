// server.js where your node app starts init project
require("dotenv").config();
var express = require('express');
var app = express();
var db = null;
var collection = null;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient,
  assert = require('assert');

// we've started you off with Express, but feel free to use whatever libs or
// frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/:id", function(request, response) {
  const id = request.params.id;
  collection.findOne({ _id: new mongo.ObjectID(id) }, function (err, result) {
    if (err || !result) {
      response.json({"error":"This url is not on the database."});
    } else {
      response.redirect(result.original_url);
    }
  });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/new/:url", function (request, response) {
  const url = request.params.url;
  if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
    collection
      .insertOne({"original_url": url})
      .then(({insertedId}) => {
        response.json({
          "original_url": url,
          "short_url": "https://url-shortener-mircroservice.herokuapp.com/" + insertedId
        });
      });
  } else {
    response.json({"error":"Wrong url format, make sure you have a valid protocol and real site."});
  }
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
