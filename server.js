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
    $("div.u-sizeFullWidth").each(function(i, element){
        //Title
        var title = $(element).find("h3").text();
    })




    });
res.send("Scrape Complete");   
});
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  