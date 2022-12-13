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
    $.get('127.0.0.1:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
    });
    $.ajax({
        type: 'POST',
        url: '127.0.0.1:5001/api/v1/places_search/',
        data: '{}',
        contentType: 'application/json',
        success: function (data) {
          for (const place of data) {
            $.get('127.0.0.1:5001/api/v1/users/' + place.user_id, function (usrData) {
              const html = `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="user">
                    <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
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
    $('button').on('click', function () {
        $('.places > article').remove();
        $.ajax({
          url: '127.0.0.1:5001/api/v1/places_search/',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ amenities: Object.keys(amenities_checked) }),
          success: function (data) {
            for (const place of data) {
              $.get('127.0.0.1:5001/api/v1/users/' + place.user_id, function (usrData) {
                const html = `<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guests</div>
                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="user">
                    <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
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
    })
});
