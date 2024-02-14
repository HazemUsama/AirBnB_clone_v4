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
        information.append("<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest != 1 ? "s" : "") + "</div>");
        information.append("<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms != 1 ? "s" : "") + "</div>");
        information.append("<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + "</div>");
        article.append(information);

        let user = $("<div>").addClass("user");
        user.append("<b>Owner:</b> " +  "<span>" + place.user.first_name + " " + place.user.last_name + "</span>");
        article.append(user);

        let description = $("<div>").addClass("description");
        description.append(place.description);
        article.append(description);

        $("section.places").append(article);
      }
    }
  });
});
