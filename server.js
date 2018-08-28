// Dependencies

var express = require("express");
var mongojs = require("mongojs");
//Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

// Initialize express

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
    request("https://kansascity.craigslist.org/search/cta?min_price=10000&condition=10&condition=20&condition=30&condition=40&condition=50", function(error, response, html){
// Load the html body from request into Cheerio
    var $ = cheerio.load(html);

//For each dib class
    $(".result-row").each(function(i, element){
        //Title
        var link = $(this).children('a').attr('href').trim();
        var price = $(this).children("a").children("span").text();
        var carInfo = $(this).children("p").text()+ "";
        var img = $(this).children("div").children("img").attr("src");
        
        
        
        db.scrapedData.insert({
            link: link,
            carInfo: carInfo,
            price: price,
            img: img
        
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
    console.log("App running on port" + PORT);
  });