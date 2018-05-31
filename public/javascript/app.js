$(document).ready(function(){
    $('.parallax').parallax();
  });

  // Grab the articles as a json
$.getJSON("/scrape/", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-title='" + data[i].title + "'>" + data[i].text + "<br />" + data[i].auther + "<br />" +  data[i].date +  "</p>");
  }
});


// Whenever someone clicks a p tag
$(".btn-large").on("click",  function() {
  // Empty the notes from the note section
  // $("#notes").empty();
  // Save the id from the p tag

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/scrape" 
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

    });
});

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
