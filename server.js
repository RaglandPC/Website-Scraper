// Dependencies

var express = require("express");
var mongojs = require("mongojs");
//Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize express

var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
    console.log("Database Error", error);
});

// Main Route
app.get("/", function(req, res){
    res.send("Hello world");
});

app.get("/all", function(req, res){
    //Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function(error, found){
        if (error){
            console.log(error);
        }
        // If no errors send to client
        else {
            res.json(found);
        }
    });
});

// Sxrape data from one site and place it into the mongodb
app.get("/scrape", function(req, res){
    request("https://medium.com/topic/technology", function(error, response, html){
// Load the html body from request into Cheerio
    var $ = cheerio.load(html);

//For each dib class
    $(".js-trackedPost.js-sectionItem").each(function(i, element){
        //Title
        var title = $(element).find("h3").text();
        var imgLink = $(element).find("a.u-block").attr("style");
        var text = $(element).find("h4").text();
        var auther = $(element).find("a.ds-link").text();
        var date = $(element).find("time").text();
      
    
        db.scrapedData.insert({
            title: title,
            imgLink: imgLink,
            text: text,
            auther: auther,
            date: date
          
        },
        function(err, inserted){
            if (err) {
                console.log(err);
            }
            else {
                console.log(inserted);
            }
        });
      
    });
  });

res.send("Scrape Complete");   
});
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  