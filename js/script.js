$(document).ready(function() {
    // Global variable
    let curFocusSearchOpt = 0;
    let specButton;
    let scrollPos;
    let idCartItem;
    let newFormID;
    let initialLeft;
    let resizeId;
    let navListWidth = 0;
    let slideshowTime;
    let currentSlideRight;
    let newPageTitle;
    let newPageTitleAjax;
    let currentScroll = $(this).scrollTop();
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let isRetina = $('section.isretina-identifier').css('display') != 'none';
    let isMobile = $('section.ismobile-identifier').css('display') != 'none';
    let isMobileNav = $('section.ismobilenav-identifier').css('display') != 'none';
    let isFullDesktop = $('section.isfulldesktop-identifier').css('display') != 'none';
    let productIDFull;
    let delayFirstSwitchReset;
    let originalPageTitle = $('title').text();
    let tempPageTitle = '🧡 Don\'t forget this!';
    let detaultQtyDropdown = '';
    let miniCartPopulated = 0;
    let minicartOsInstance;
    let carouselOverlayScroll;
    // -- Global Nav Desktop Line -- //
    const lineTarget = document.querySelector('.header .sub-nav .line');
    const menuLinks = document.querySelectorAll('.allnav');
    let menuUnderline = $('.header .sub-nav .line');
    for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('mouseenter', mouseenterFunc);
    menuLinks[i].addEventListener('mouseout', mouseoutFunc);
    }
    function mouseenterFunc() {
        const rect = this.getBoundingClientRect();
        //const { width, height, left, top } = rect ;
        const width = rect.width;
        const height = rect.height;
        const left = rect.left;
        const top = rect.top;

        menuUnderline.show();
        lineTarget.style.left = left+(width-menuUnderline.outerWidth())*0.5+'px';
        lineTarget.style.transform = 'none';
    }
    function mouseoutFunc() {
        menuUnderline.hide();
    }

    function checkScroll(){
        if ($(window).scrollTop() < 40) {
            $('.header').removeClass('fixed');
        }
        else {
            if ((!$('.mobile-nav-trigger .nav-toggle').hasClass('dropped')) && (!$('.search-bar-mobile').is(':visible'))) {
                $('.header').addClass('fixed');
            }
        }
    }
    if (isMobileNav) {
        $('.header').addClass('mobile');
        $('.header').removeClass('desktop');
        checkScroll();
    }
    $(document).scroll(function(){
        if (isMobileNav) {
            checkScroll();
        }
    });
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 250);
    });
    function doneResizing(){
        isMobile = $('section.ismobile-identifier').css('display') != 'none';
        isMobileNav = $('section.ismobilenav-identifier').css('display') != 'none';
        isFullDesktop = $('section.isfulldesktop-identifier').css('display') != 'none';
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        if (isMobileNav) {
            $('.header').addClass('mobile');
            $('.header').removeClass('desktop');
            $('.header').removeClass('fixed-nav');
            $('.header').removeClass('transition');
            if (!$('.mobile-nav-trigger .nav-toggle').hasClass('dropped')) {
                $('.header .sub-nav').hide();
            }
            if ($(window).scrollTop() < 40) {
                $('.header').removeClass('fixed');
            }
        }
        else {
            $('.header').removeClass('mobile');
            $('.header').addClass('desktop');$('.header .sub-nav').show();
            $('body').removeClass('scrollable');
            $('html').removeClass('scrollable');
            $('.header .sub-nav').removeClass('promo-visible');
            $('.mobile-nav-trigger .nav-toggle').removeClass('dropped');
            if ($(window).scrollTop() < 40) {
                $('.header').removeClass('fixed');
            }
        }
        if(windowWidth <= 1065) {
            carouselOverlayScroll = OverlayScrollbars($('.sp-product-scroll'), { });
        }
        else if (carouselOverlayScroll !== undefined) {
            let carouselOverlayScrollArrayLength = carouselOverlayScroll.length;
            if (carouselOverlayScrollArrayLength !== undefined){ // if multiple instances
                for (let i = 0; i < carouselOverlayScrollArrayLength; i++) {
                    if (OverlayScrollbars.valid(carouselOverlayScroll[i])) {
                        carouselOverlayScroll[i].destroy();
                    }
                }
            }
            else {
                carouselOverlayScroll.destroy();
            }
        }
    }


    // Replaced with more sophisticated method above
    $('.header .sub-nav .sitenav-wrap>ul>li.allnav').hover(
        function() {
            if ($('.header').hasClass('desktop')) {
                $('.header.desktop .sub-nav .sitenav-wrap>ul>li.allnav').each(function() {
                    let updateWidth = $(this);
                    navListWidth += updateWidth.outerWidth();
                    $(this).css('left' , navListWidth);
                });
                $('.header.desktop .sub-nav .sitenav-wrap>ul').css('width' , navListWidth);
                initialLeft = (windowWidth - navListWidth) / 2;
                let cliWidth = $(this).outerWidth();
                let prevLisWidth = $(this).css('left');
                let prevLwNum = parseInt(prevLisWidth, 10);
                let newLeftAdd = prevLwNum - (cliWidth / 2);
                let newLeft = (initialLeft + newLeftAdd) - 15;
                $('.header .sub-nav .line').show();
                $('.header .sub-nav .line').css('left' , newLeft);
            }
        },
        function() {
            navListWidth = 0;
            $('.header .sub-nav .line').hide();
        }
    );

    // -- Global Nav Hover and Adjusted Min Height -- //
    $('.header .sub-nav .sitenav-wrap>ul').hover(
        function(){
            // console.log("Hover In");
        },
        function(){
            // console.log("Hover Out");
            $('.header .sub-nav .sitenav-wrap>ul>li.hovered .drop-wrap')
            .slideUp()
            .animate(
                { opacity: 0 },
                { queue: false, duration: 'fast' }
            );
            $('.header .sub-nav .sitenav-wrap>ul>li.hovered').removeClass('hovered');
        }
    )
    $('.header .sub-nav .sitenav-wrap>ul>li>a').hoverIntent(
        function(){
            // console.log("hoverIntent");
            // if (!isMobileNav) {
                if (!$(this).parent().hasClass('hovered')) {
                    $('#ms-trending-drop').hide();
                    $('#ms-suggested-drop').hide();
                    $('.header .sub-nav .sitenav-wrap>ul>li.hovered .drop-wrap')
                    .slideUp()
                    .animate(
                        { opacity: 0 },
                        { queue: false, duration: 'fast' }
                    );

                    $('.header .sub-nav .sitenav-wrap>ul>li.hovered').removeClass('hovered');
                    $(this).parent().addClass('hovered');

                    $('.header .sub-nav .sitenav-wrap>ul>li.hovered .drop-wrap')
                    .slideDown()
                    .animate(
                        { opacity: 1 },
                        { queue: false, duration: 'fast' }
                    );
                }
            // }
        },
        function(){}
    );

    function closeMobileSearch() {
        $('.search-bar-mobile').hide();
        $('body').width('100%');
        $('body').css('overflow-y' , '');
        $('body').removeClass('scrollable mobile-menu');
        $('.blackout-main').hide();
        document.ontouchmove = function(e){}
    }

    $('.mobile-nav-trigger .nav-toggle').on('click', function() {
        if ($('.search-bar-mobile').is(':visible')) {
            closeMobileSearch();
        }
        $('#notification .not-content.active').removeClass('active');
        $('#notification').removeClass('fadein');
        $('#notification').removeClass('fadeout');
        $(this).toggleClass('dropped');
        if ($(this).hasClass('dropped')){
            $('.header .sub-nav').toggle();
            let scrollPos = $(window).scrollTop();
            if (scrollPos >= 40) {
                $('.promo-bar').hide();
            }
            else {
                if ($('.promo-bar').is(':visible')) {
                    $('.header .sub-nav').addClass('promo-visible');
                }
            }
            $('body').addClass('scrollable mobile-menu');
            $('html').addClass('scrollable mobile-menu');
            $('.temp-info').html(scrollPos);
        }
        else {
            let scrollPosTemp = $('.temp-info').html();
            let scrollPos = parseInt(scrollPosTemp);
            $('.promo-bar').show();
            $('.header .sub-nav').removeClass('promo-visible');
            $('body').removeClass('scrollable mobile-menu');
            $('html').removeClass('scrollable mobile-menu');
            $(window).scrollTop(scrollPos);
            $('.header .sub-nav').toggle();
            window.ontouchmove = null;
        }
    });

    $('header').on('click', '.header.mobile .sub-nav ul#sitenav li span.mdrop-sub', function() {
        let mDrop = $(this).parent();
        let mDropUl = $('ul#sitenav');
        let mobileAccount = $('.header.mobile .my-account-mobile');
        mDrop.addClass('active');
        if (mDropUl.hasClass('first-level')) {
            mobileAccount.fadeOut(100);
            mDropUl.animate({'opacity':'0'}, 100, function() {
                mDrop.addClass('activenow');
                mDropUl.removeClass('first-level');
                mDropUl.addClass('second-level');
                let smcCount = mDrop.find('ul.second-mchild>li').length;
                let smcTime = smcCount * 30;
                mDropUl.animate({'opacity':'1'}, 100, function() {
                    mDrop.find('ul.second-mchild').slideDown(smcTime, function() {
                        mobileAccount.fadeIn('fast');
                    });
                });
            });
        }
        else {
            mobileAccount.fadeOut(100);
            mDropUl.animate({'opacity':'0'}, 100, function() {
                mDrop.addClass('activenow');
                mDropUl.addClass('first-level');
                let smcCount = mDrop.find('ul.mini-nav.mobile>li').length;
                let smcTime = smcCount * 30;
                mDropUl.animate({'opacity':'1'}, 100, function() {
                    mDrop.find('ul.mini-nav.mobile').slideDown(smcTime, function() {
                        mobileAccount.fadeIn('fast');
                    });
                });
            });
        }
    });
    $('header').on('click', '.header.mobile .sub-nav ul#sitenav div.back', function() {
        let mDropUl = $('ul#sitenav');
        let mDrop = $(this).closest('li');
        if (mDropUl.hasClass('first-level')) {
            mDropUl.animate({'opacity':'0'}, 100, function() {
                mDrop.find('ul.mini-nav.mobile').hide();
                mDropUl.removeClass('first-level');
                $('.header.mobile .sub-nav ul#sitenav li.active').removeClass('activenow');
                $('.header.mobile .sub-nav ul#sitenav li.active').removeClass('active');
                mDropUl.animate({'opacity':'1'}, 100);
            });
        }
        else {
            mDropUl.animate({'opacity':'0'}, 100, function() {
                mDrop.closest('ul.mini-nav.mobile').hide();
                mDrop.find('ul.second-mchild').hide();
                $('.header.mobile .sub-nav ul#sitenav li.active li.active').removeClass('activenow');
                $('.header.mobile .sub-nav ul#sitenav li.active li.active').removeClass('active');
                mDropUl.removeClass('second-level');
                mDropUl.addClass('first-level');
                let smcCount = mDrop.closest('ul.mini-nav.mobile>li').length;
                let smcTime = smcCount * 30;
                mDropUl.animate({'opacity':'1'}, 100, function() {
                    mDrop.closest('ul.mini-nav.mobile').slideDown(smcTime);
                });
            });
        }
    });


    // ---- Animated Banners ---- //
    $('.promo-bar .fixed-width').css('display', 'flex');
    let animatedBanner, animatedPromoBanner;
    $('.banner.swiper-container#banner_6').hover(function(){
        animatedPromoBanner.autoplay.stop();
    }, function(){
        animatedPromoBanner.autoplay.start();
    });
    $('.banner.swiper-container:not(#banner_6)').hover(function(){
        animatedBanner.autoplay.stop();
    }, function(){
        animatedBanner.autoplay.start();
    });
    if ($('.banner.swiper-container').length) {
        $('.banner.swiper-container').each(function() {
            let currentBanner = $(this);
            if (currentBanner.closest('.promo-bar').length) {
                if (isMobile) {
                    let desktopBannerItems = currentBanner.find('.banner-item-anim.desktop-only');
                    desktopBannerItems.remove();
                    animatedPromoBanner = new Swiper (currentBanner, {
                        loop: true,
                        speed: 300,
                        height: 40,
                        touchRatio: .3,
                        autoplay: {
                            delay: 5200,
                        },
                    });
                }
                else {
                    let mobileBannerItems = currentBanner.find('.banner-item-anim.mobile-only');
                    mobileBannerItems.remove();
                    animatedPromoBanner = new Swiper (currentBanner, {
                        loop: true,
                        direction: 'vertical',
                        speed: 300,
                        height: 40,
                        touchRatio: .3,
                        autoplay: {
                            delay: 5200,
                        },
                    });
                }
            }
            else {
                let bannerPag = currentBanner.children('.pagination');
                if (isMobile) {
                    let desktopBannerItems = currentBanner.find('.banner-item-anim.desktop-only');
                    desktopBannerItems.remove();
                }
                else {
                    let mobileBannerItems = currentBanner.find('.banner-item-anim.mobile-only');
                    mobileBannerItems.remove();
                }
                animatedBanner = new Swiper (currentBanner, {
                    loop: true,
                    speed: 300,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 5200,
                    },
                });
            }
        });
    }

    // -- Back to Top Click -- //
    $('.back-to-top').on('click', function(){
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    fullLoaderHeight();
    $(window).scroll(function() {
        currentScroll = $(this).scrollTop()
            if (currentScroll > 1500) {
                $('.back-to-top').addClass('active');
            }
            else {
                $('.back-to-top').removeClass('active');
            }
        fullLoaderHeight();
            if ((!isMobileNav) && (!$('div.static-page-s').length)) {
                if (currentScroll <= 40) {
                    $('.header').removeClass('fixed-nav');
                    $('.header').removeClass('transition');
                    function delayNavAnimR() {
                        $('.header').removeClass('transition');
                        clearTimeout(delayNavTimerR);
                    }
                    delayNavTimerR = window.setTimeout(delayNavAnimR, 200);
                }
                else if (currentScroll > 151) {
                    $('.header').addClass('fixed-nav');
                    function delayNavAnim() {
                        $('.header').addClass('transition');
                        clearTimeout(delayNavTimer);
                    }
                    delayNavTimer = window.setTimeout(delayNavAnim, 200);
                }
            }
    });

    function fullLoaderHeight() {
        var fslCS = $(window).scrollTop();
        if (isMobileNav) {
            if (fslCS == 0) {
                var fslTop = 94;
            }
            else if (fslCS > 0 && fslCS < 40) {
                var fslTop = 94 - fslCS;
            }
            else {
                var fslTop = 54;
            }
        }
        else {
            if ($('body').hasClass('checkout-body')) {
                if (fslCS == 0) {
                    var fslTop = 60;
                }
                else if (fslCS > 0 && fslCS < 60) {
                    var fslTop = 60 - fslCS;
                }
                else {
                    var fslTop = 0;
                }
            }
            else {
                if (fslCS == 0) {
                    var fslTop = 151;
                }
                else if (fslCS > 0 && fslCS < 151) {
                    var fslTop = 151 - fslCS;
                }
                else {
                    var fslTop = 0;
                }
            }
        }
        var isFullMobile = $('section.isfullmobile-identifier').css('display') != 'none';
        if (isFullMobile) {
            $('#notification').css('margin-top', fslTop+'px');
        }
        $('.fullscreen-loader, .fullscreen-reload').css('top', fslTop+'px');
        $('.fullscreen-loader, .fullscreen-reload').css('height', '-webkit-calc(100vh - '+fslTop+'px)');
        $('.fullscreen-loader, .fullscreen-reload').css('height', '-moz-calc(100vh - '+fslTop+'px)');
        $('.fullscreen-loader, .fullscreen-reload').css('height', 'calc(100vh - '+fslTop+'px)');
    }

    // -- Suggested Items -- //
    $('.suggested-products .sp-arrows .arrow-wrap').on('click', function() {
        let spParentDiv = $(this).closest('.suggested-products');
        let spScrollDiv = spParentDiv.find('.sp-ps-inner');
        let spscWidth = spScrollDiv.width();
        let checkPosition = spScrollDiv.css('right');
        let noPX = checkPosition.replace('px', '');
        let oldPosition = parseFloat(noPX);
        let rightOrLeft = $(this);
        spParentDiv.find('.sp-product').addClass('visible');
        if (rightOrLeft.hasClass('right')) {
            spParentDiv.find('.left').removeClass('disabled');
            let newPosition = oldPosition + spscWidth;
            spParentDiv.find('.sp-arrows .arrow-wrap').css('pointer-events', 'none');
            spScrollDiv.css('right', newPosition + 'px');
            let checkMaxScrollN = spScrollDiv.children('.sp-product').length;
            let checkMaxScrollH = spScrollDiv.children('.sp-product').width();
            let cmsNumber = checkMaxScrollN * checkMaxScrollH;
            let checkMax = newPosition + spscWidth;
            if (checkMax >= cmsNumber) {
                $(this).addClass('disabled');
            }
        }
        else {
            spParentDiv.find('.right').removeClass('disabled');
            let newPosition = oldPosition - spscWidth;
            spParentDiv.find('.sp-arrows .arrow-wrap').css('pointer-events', 'none');
            spScrollDiv.css('right', newPosition + 'px');
            if (newPosition == 0) {
                $(this).addClass('disabled');
            }
        }
        function delayClickable() {
            spParentDiv.find('.sp-arrows .arrow-wrap').css('pointer-events', 'auto');
            clearTimeout(spClickFunc);
        }
        spClickFunc = window.setTimeout(delayClickable, 350);
    });

    let candidInitiated = 0;
    $(window).scroll(function() {
        if (($(window).scrollTop() + windowHeight >= $('#candid-container').offset().top - 400) && (!candidInitiated)) {
            candidInitiated = 1;
            candid.init({
                id: '08225b75-434d-4401-9566-027dde2f63d8',
                width: 220,
                frameHeight:245,
                margin: 10,
                animationSpeed:1500,
                count: 15,
                slideshowSpeed:5000,
                logo:false,
                linksHeading:'SHOP THIS LOOK',
                tag:'show',
                containerId:'candid-container'
            });
        }
    });

    $('.about-text').on('click', function(){
        $(this).toggleClass('active');
        $('.expand-icon').toggle();
    });
})
