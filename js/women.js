$(document).ready(function() {

    // Global variable
    let filterParentDiv = $('.product-browse .products .products-display .display-nav-wrapper');

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

    // -- Mobile Filters Opened -- //
    $('.products-display .mobile-buttons .mb-filters').on('click', function() {
        if ($('.products-display .mobile-buttons').hasClass('follow')) {
            $('html, body').animate({ scrollTop: '94' }, function() {
                filterParentDiv.slideDown('fast');
                filterParentDiv.addClass('active');
                $(this).children('img').addClass('flipped');
                $(this).addClass('dropped');
            });
        }
        else {
            filterParentDiv.slideToggle('fast');
            filterParentDiv.toggleClass('active');
            $('.show-new-products').removeClass('active');
            $(this).children('img').toggleClass('flipped');
            $(this).toggleClass('dropped');
        }
    });
    $('.products-display .display-nav-wrapper .close.mobile').on('click', function() {
        filterParentDiv.slideUp();
        $('.show-new-products').removeClass('active');
        filterParentDiv.removeClass('active');
    });
})