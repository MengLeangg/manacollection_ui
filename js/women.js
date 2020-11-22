$(document).ready(function() {
    // -- Category Description Show More -- //
    $('.category-desc-mini').on('click', function() {
        if (!$(this).hasClass('disabled')) {
            $('.category-desc-mini').toggleClass('collapsed');
        }
    });

    // -- Desktop Sort Filter Drop -- //
    $('.sort-filter-wrapper .filter-label').on('click', function(e) {
        e.stopPropagation();
        $('.sort-filter-wrapper').toggleClass('active');
        $(this).children('i').toggleClass('active');
        $('.sort-filter-wrapper .filter-container').toggle();
        $('.filters .filter-label.active').removeClass('active');
        $('.filters .filter-label.active i.fa-chevron-down').addClass('active');
        $('.filters .filter-label.active i.fa-chevron-up').removeClass('active');
        $('.filters .filter-container.active').removeClass('active');
        $(document).on('click', function(e) {
            $('.sort-filter-wrapper').removeClass('active');
            $('.sort-filter-wrapper .filter-container').hide();
            $('.sort-filter-wrapper .filter-label i.fa-chevron-down').addClass('active');
            $('.sort-filter-wrapper .filter-label i.fa-chevron-up').removeClass('active');
        });
    });
})