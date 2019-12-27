// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

function displayResults(articles) {
  var modalTitle =

  articles.forEach(function(article) {
    var tr = $("<tr>").prepend(
      '<input type="button" value="Go" onclick="window.location.href=' + "'" + article.link + "'" + '" />',
      $("<td>").text(article.title).attr('id', article.title),
      '<div class="top-buttons"><button type="button" class="btn btn-primary" id="add-comment" value="' + article.title + '" value="' + article._id + '">&#10063;</button></div>',
      // $("<td>").text(article.comment),
      // $("<td>").text(article._id),
          );
    $("tbody").prepend(tr);
  });
};

$(document).on('click', '#add-comment', function () {
  modalTitle = $(this).attr('value');
  showModal()
});


$.getJSON("/all", function(data) {

  displayResults(data);
});

$("#scrape").on("click", function() {
  $.getJSON("/scrape", function(data) {
    displayResults(data);
  })
  location.reload();
});

$("#clear").on("click", function() {
    $.getJSON("/clear", function(data) {
      displayResults(data);
    }) 
  $("tbody").empty();
});


function showModal() {
  $('#myModal').modal('show');
console.log(modalTitle)
  $("#articleName").text(modalTitle)

};





$(document).on('click', '#submit', function () {

  $('#comments').children('input').val('');
});
