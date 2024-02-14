$('document').ready(function () {
  let checked = [];
  $('.amenities input').each(function(){
    $(this).prop('checked', false);
  });

  $('.amenities input').on('change', function () {
    const name = $(this).data('name');
    if (checked.includes(name)) {
      checked = checked.filter(item => item !== name);
    } else {
      checked.push(name);
    }
    $('.amenities h4').text(checked.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (res) {
    if (res.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.post({
    url: "http://0.0.0.0:5001/api/v1/places_search",
    data: JSON.stringify({}),
    contentType: "application/json",
    success: function (places) {
      for (let place of places) {
        let article = $("<article>").addClass("place");
        let titleBox = $("<div>").addClass("title_box");
        titleBox.append("<h2>" + place.name + "</h2>");
        titleBox.append("<div class='price_by_night'>$" + place.price_by_night + "</div>");
        article.append(titleBox);

        let information = $("<div>").addClass("information");
        information.append($("<div>" + place.max_guest + " Guests</div>")
          .addClass('max_guest'));

        information.append($("<div>" + place.number_rooms + " Bedrooms</div>")
          .addClass('number_rooms'));

        information.append($("<div>" + place.number_bathrooms + " Bathrooms</div>")
          .addClass('number_bathrooms'));

        article.append(information);

        let description = $("<div>").addClass("description");
        description.append(place.description);
        article.append(description);

        $("section.places").append(article);
      }
    }
  });
});
