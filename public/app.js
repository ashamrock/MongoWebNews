function displayResults(articles) {

  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);

  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // $("tbody").empty();

  articles.forEach(function(article) {

    var tr = $("<tr>").prepend(
      $("<td>").text(article.title),
      $("<td>").text(article.summary),
      $("<td>").text(article.link),
      $("<td>").text(article.comment),
      
    );

    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");

    $("tbody").prepend(tr);
  });
}


$("#scrape").on("click", function() {
  $.getJSON("/scrape", function(data) {
    displayResults(data);
  })
  location.reload();
});

$.getJSON("/all", function(data) {
  displayResults(data);
});


$(document).on("click", ".saveNote", function() {
  // Empty the notes from the note section
  var notesObj = {
    title: $("#title").val().trim(),
    body: $("#notes").val().trim()
  }
  console.log(notesObj);
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "POST",
    url: "/save/note/" + thisId,
    data: notesObj

  })
    // With that done, add the note information to the page
    .done(function(data) {
    location.reload();
    });
});

$(document).on("click", ".deleteNote", function() {
  // Empty the notes from the note section

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  //console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "POST",
    url: "/delete/note/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      location.reload();
    });
});