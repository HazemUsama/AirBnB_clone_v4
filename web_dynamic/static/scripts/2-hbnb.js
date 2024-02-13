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
  })
  $.get('http://0.0.0.0:5001/api/v1/status/', function (res) {
    if (res.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
