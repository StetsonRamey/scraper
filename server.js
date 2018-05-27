// DEPENDENCIES =======================================
// =====================================================

var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan');
var mongoose = require("mongoose");
var path = require('path');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// MIDDLEWARE =======================================
// =====================================================

// logger for logging request
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



// TODO: ROUTES =======================================
// =====================================================

// GET the html
app.get('/saved', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/saved.html'));
});

// TODO: GET for scraping our site
app.get('/scrape', function (req, res) {

})

// GET for getting all articles from DB
app.get('/articles', function (req, res) {
  db.article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// GET route for getting a specific article and it's comments
app.get('/articles/:id', function (req, res) {
  db.article.findOne({ _id: req.params.id })
  .populate('comment')
  .then(function (dbArticle) {
    res.json(dbArticle);
  })
  .catch(function (err) {
    res.json(err);
  });
});

// POST route for updating and saving a comment
app.post('/articles/:id', function (req, res) {
  db.comment.create(req.body)
    .then(function (dbComment) {
      return db.article.findOneAndUpdate({ _id: req.params.id }, {comment: dbComment._id}, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// RUN IT =======================================
// =====================================================

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});