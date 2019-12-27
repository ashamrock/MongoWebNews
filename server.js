var express = require("express");
var mongojs = require("mongojs");
var mongo = require('mongodb');
var axios = require("axios");
var cheerio = require("cheerio");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

var webNews = require("./model.js");

mongoose.connect("mongodb://localhost/news", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

var databaseUrl = "news";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("error #:", error);
});

app.listen(3000, function() {
  console.log("App up and running on port 3000");
});

app.get("/all", function(req, res) {
  db.articles.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
      // console.log(found);
    }
  });
});

app.post("/submit", function(req, res) {
  // Create a new user using req.body
  webNews.create(req.body)
    .then(function() {
      db.articles.insert({
        comments: comment,
      });
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

app.get("/scrape", function(req, res) {
  axios.get("https://news.ycombinator.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    $(".title").each(function(i, element) {
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
      if (title && link) {
        db.articles.insert({
          title: title,
          link: link,

        },
        function(err, inserted) {
          if (err) {
            console.log(err);
          }
          // else {
          //   console.log(inserted);
          // }
        });
      }
    });
  });
});

app.get("/clear", function(req, res) {
  db.articles
  .remove({})
});



    app.get("/test", function(req, res) {
      var head = 'Dropbox Transfer'
      db.articles.findOne({"title": head}, function(error, found) {
            if (error) {
              console.log(error);
            }
            else {
              res.json(found);
              console.log(found);
            }
          })


            });
