// TODO: write all this shit

//TODO: write a .getJSON to get all the scraped articles and load them into cards for the front page
$.getJSON('/articles', function(data) {

    console.log(data);
    
    for (let i = 0; i < data.length; i++) {
      $('#article-container').append(
        '<div class="card" data-id=' + data[i]._id + '>' +
          '<div class="card-header">Featured</div>' +
          '<div class="card-body">' +
            '<h5 class="card-title">Special title treatment</h5>' +
            '<p class="card-text">' +
              'With supporting text below as a natural lead-in to additional content.' +
            '</p>' +
            '<a href="#" class="btn btn-primary">' +
              'Go somewhere' +
            '</a>' +
          '</div>' +
        '</div>'
      );
    }
  });

//TODO: write a .getJSON to get all the saved articles and load them into cards for the saved page

// TODO: write a on("click") to save an article

// TODO: write a on("click") to delete an article

// TODO: write a on("click") to save a comment

// TODO: write a on("click") to delete a comment
