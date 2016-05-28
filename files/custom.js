$(window).load(function () {

    "use strict";
    
    /* PRE LOADER */
    jQuery(".status").fadeOut();
    jQuery(".preloader").delay(1000).fadeOut("slow");
    
    /*---------------------------------------*/
    /*	WOW FOR ANIMATION ON SCROLL
     /*---------------------------------------*/
    var wow = new WOW({
        mobile: false
    });
    wow.init();

    /*---------------------------------------*/
    /*	NAVIGATION
     /*---------------------------------------*/
    $('.main-navigation').onePageNav({
        changeHash: true,
        currentClass: 'not-active', /* CHANGE THE VALUE TO 'current' TO HIGHLIGHT CURRENT SECTION LINK IN NAV*/
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: ':not(.external)'
    });

    /*---------------------------------------*/
    /*	STELLAR FOR BACKGROUND SCROLLING
     /*---------------------------------------*/

    $(window).stellar({
        horizontalScrolling: false,
        responsive: true
    });

});


$(window).resize(function () {

    "use strict";

    var ww = $(window).width();

    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    if (ww < 480) {
        $('.sticky-navigation a').on('click', function () {
            $(".navbar-toggle").click();
        });
    }
});

(function ($) {

    "use strict";


    /*---------------------------------------*/
    /*	VIDEO BACKGROUND
     /*---------------------------------------*/
    $('body').videoBG({
        position: "fixed",
        zIndex: 0,
        mp4: '/external/5/video/video.mp4',
        ogv: '/external/5/video/video.ogv',
        webm: '/external/5/video/video.webm',
        poster: '/external/5/video/video.jpg',
        opacity: 1,
        fullscreen: true
    });
    /*---------------------------------------*/
    /*	SMOOTH SCROLL FRO INTERNAL #HASH LINKS
     /*---------------------------------------*/

    $('a[href^="#"].inpage-scroll, .inpage-scroll a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
                $target = $(target);
        $('.main-navigation a[href="' + target + '"]').addClass('active');
        $('.main-navigation a:not([href="' + target + '"])').removeClass('active');
        $('html, body').stop().animate({
            'scrollTop': ($target.offset()) ? $target.offset().top : 0
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });


    /*---------------------------------------*/
    /*	NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
     /*---------------------------------------*/

    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40)
            $('.appear-on-scroll').stop().animate({
                "opacity": '1',
                "top": '0'
            });
        else
            $('.appear-on-scroll').stop().animate({
                "top": '-70',
                "opacity": '0'
            });

        /* if (top > 95) {
         $('.js-login').fadeOut(20);
         }
         else {
         $('.js-login').fadeIn(200);
         
         }
         
         if (top > 200) {
         $('.js-register').fadeIn(200);
         }
         else {
         $('.js-register').fadeOut(200);
         
         } */
    }


    /*---------------------------------------*/
    /*	SCREENSHOT CAROUSEL
     /*---------------------------------------*/

    $("#screenshots").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    /*---------------------------------------*/
    /*	SCREENSHOT LIGHTBOX
     /*---------------------------------------*/

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale',
    });


    /*---------------------------------------*/
    /*	PLACEHOLDER FIX
     /*---------------------------------------*/
    //CREATE PLACEHOLDER FUNCTIONALITY IN IE
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    //ENSURE PLACEHOLDER TEEXT IS NOT SUBMITTED AS POST
    $('[placeholder]').parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });

    /*---------------------------------------*/
    /*	BOOTSTRAP FIXES
     /*---------------------------------------*/

    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function () {
        oldSSB.apply(this);
        if (this.scrollbarWidth)
            $('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function () {
        oldRSB.apply(this);
        $('.navbar-fixed-top').css('padding-right', '');
    }

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
                document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                        )
                )
        document.querySelector('head').appendChild(msViewportStyle)
    }



})(jQuery);

/*---------------------------------------*/
/*	TIMELINE SLIDER
 /*---------------------------------------*/
jQuery(window).load(function () {

    'use strict';

    var x = 0,
            init,
            container = $('.timeline-section'),
            /* TIMELINE SELECTOR */
            items = container.find('li'),
            containerHeight = 0,
            numberVisible = 4,
            /* NUMBER OF <li> TO SHOW IN SCROLLER */
            intervalSec = 4000; /* INTERVAL TIME */

    if (!container.find('li:first').hasClass("first")) {
        container.find('li:first').addClass("first");
    }

    items.each(function () {
        if (x < numberVisible) {
            containerHeight = containerHeight + $(this).outerHeight();
            x = x + 1;
        }
    });

    container.css({
        height: containerHeight,
        overflow: "hidden"
    });

    function vertCycle() {
        var firstItem = container.find('li.first').html();

        container.append('<li>' + firstItem + '</li>');
        firstItem = '';
        container.find('li.first').animate({
            marginTop: "-105px",
            opacity: "0"
        }, 600, function () {
            $(this).remove();
            container.find('li:first').addClass("first");
        });
    }

    if (intervalSec < 700) {
        intervalSec = 700;
    }

    init = setInterval(function () {
        vertCycle();
    }, intervalSec);

    container.hover(function () {
        clearInterval(init);
    }, function () {
        init = setInterval(function () {
            vertCycle();
        }, intervalSec);
    });

});