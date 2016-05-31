$(document).ready(function() {

  attachSubmitHandler();

  $.get( 'http://api.themoviedb.org/3/genre/movie/list?api_key=004e123754bc0226d214eb3f87baa06f', function(data) {
    for (let i = 0; i < data.genres.length; i++) {
      var genre = data.genres[i].name;
      $('#genre').append('<option value=' + genre + '>' + genre + '</option>');
    }
  });

});

var form = $('form');

function attachSubmitHandler() {
  $('form').submit(function(event) {
    event.preventDefault();
    form.find('.message').empty()
    // console.log(getFormData())
    $.post('https://mighty-eyrie-15280.herokuapp.com/films', getFormData())
    .done(function(result) {
      var message = result.message;
      form.find('.message').html("<br><div class='alert alert-success' role='alert'>" + message + "</div>").fadeIn(200);
    })
    .fail(function(xhr, status, errorThrown) {
      var message = xhr.status + ': ' + errorThrown;
      form.find('.message').html("<br><div class='alert alert-danger' role='alert'>" + message + "</div>").fadeIn(200);
    });
  });
}

function getFormData() {
  return {
    title: form.find('#title').val(),
    genre: form.find('#genre').val(),
    description: form.find('#description').val(),
    coverPicture: form.find('#coverPicture').val(),
    rating: form.find('#rating').val()
  };
}
