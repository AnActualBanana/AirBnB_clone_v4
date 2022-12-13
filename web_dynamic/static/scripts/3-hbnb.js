$(document).ready(function() {
    const amenities_checked = {};
    $(document).on('change', "input[type='checkbox']", function() {
        if (this.checked) {
            amenities_checked[$(this).data('id')] = $(this).data('name');

        } else {
            delete amenities_checked[$(this).data('id')];
        }
        const amenities_list = []
        for (const idx in amenities_checked) {
            amenities_list.push(amenities_checked[idx]);
        }
        $('.amenities h4').text(amenities_list.join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
    });
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json', 
      dataType: 'json',
      data: JSON.stringify({}),
      success: function(data) {
        for (const place of data) {
          $.get('http://0.0.0.0:5001/api/v1/places_search/' + place.user_id, function (userData) {
            let guestsPlural = '';
            if (place.max_guest != 1) {
              let guestsPlural ='s';
            } 
            let roomsPlural = ''
            if (place.number_rooms != 1) {
              let roomsPlural ='s';
            }
            let bathroomPlural = ''
            if (place.number_bathrooms != 1) {
              let bathroomPlural ='s';
            } 
            let html = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${guestsPlural}</div>
                    <div class="number_rooms">${place.number_rooms } Bedroom${roomsPlural}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathroomPlural}</div>
            </div>
            <div class="user">
                    <b>Owner:</b> ${userData.first_name} ${userData.last_name}
                  </div>
                  <div class="description">
              ${place.description}
                  </div>
              </article>`;
          $('.places').append(html);
          });
        }
      }
    });
});
