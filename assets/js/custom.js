jQuery(document).ready(function($) {

/*------------------------------------------------
            DECLARATIONS
------------------------------------------------*/

    var scroll              = $(window).scrollTop();  
    var scrollup            = $('.backtotop');
    var menu_toggle         = $('.menu-toggle');
    var nav_menu            = $('.main-navigation ul.nav-menu');

/*------------------------------------------------
            BACK TO TOP
------------------------------------------------*/

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            scrollup.css({bottom:"25px"});
        } 
        else {
            scrollup.css({bottom:"-100px"});
        }
    });

    scrollup.click(function() {
        $('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });

/*------------------------------------------------
            MAIN NAVIGATION
------------------------------------------------*/

    menu_toggle.click(function() {
        $(this).toggleClass('active');
        nav_menu.slideToggle();
        $('.main-navigation .sub-menu').slideUp();
        $('.main-navigation .dropdown-toggle').removeClass('toggled-on');
    });

    $('.main-navigation .nav-menu .menu-item-has-children > a').after( $('<button class="dropdown-toggle"><i class="fas fa-caret-down"></i></button>') );

    $('.main-navigation .dropdown-toggle').keyup(function(event) {
        if( event.keyCode == 9 ) {
            $(this).parent().find('.sub-menu').first().slideDown();
            $(this).addClass('toggled-on');
        }
    });
    
    $('button.dropdown-toggle').click(function() {
        $(this).toggleClass('active');
       $(this).parent().find('.sub-menu').first().slideToggle();
    });

/*------------------------------------------------
            KEYBOARD NAVIGATION
------------------------------------------------*/

    if( $(window).width() < 1024 ) {
        nav_menu.find("li").last().bind( 'keydown', function(e) {
            if( !e.shiftKey && e.which === 9 ) {
                e.preventDefault();
                $('#masthead').find('.menu-toggle').focus();
            }
        });
    }
    else {
        nav_menu.find("li").unbind('keydown');
    }

    $(window).resize(function() {
        if( $(window).width() < 1024 ) {
            nav_menu.find("li").last().bind( 'keydown', function(e) {
                if( !e.shiftKey && e.which === 9 ) {
                    e.preventDefault();
                    $('#masthead').find('.menu-toggle').focus();
                }
            });
        }
        else {
            nav_menu.find("li").unbind('keydown');
        }
    });

    menu_toggle.on('keydown', function (e) {
        var tabKey    = e.keyCode === 9;
        var shiftKey  = e.shiftKey;

        if( menu_toggle.hasClass('active') ) {
            if ( shiftKey && tabKey ) {
                e.preventDefault();
                nav_menu.find("li:last-child > a").focus();
                nav_menu.find("li").last().bind( 'keydown', function(e) {
                    if( !e.shiftKey && e.which === 9 ) {
                        e.preventDefault();
                        $('#masthead').find('.menu-toggle').focus();
                    }
                });
            };
        }
    });

/*------------------------------------------------
                END JQUERY
------------------------------------------------*/

});