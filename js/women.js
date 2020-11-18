$(document).ready(function() {
    // -- Category Description Show More -- //
    $('.category-desc-mini').on('click', function() {
        if (!$(this).hasClass('disabled')) {
            $('.category-desc-mini').toggleClass('collapsed');
        }
    });
})