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
        $('.amenities h4').text(amenities_list.join(', '))
    })
})
