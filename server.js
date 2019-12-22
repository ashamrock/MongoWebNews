var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();

app.use(express.static("public"));

var databaseUrl = "news";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/all", function(req, res) {
  db.articles.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
      console.log(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  axios.get("https://news.ycombinator.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $(".title").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      if (title && link) {
        db.articles.insert({
          title: title,
          link: link
        },
        function(err, inserted) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(inserted);
          }
        });
      }
    });
  });

});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
