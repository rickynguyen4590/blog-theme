var html = $('html');
$(function () {
    idle(loadFb);
    idle(loadGG);
    darkMode();
    idle(carousel);
    video();
    gallery();
    author();
    idle(offCanvas);
    idle(highlight);
});

function idle(cb) {
    setTimeout(cb, 1000 + Math.random() * 4000);
}

function loadFb() {
    const script = document.createElement('script');
    script.crossOrigin = "anonymous";
    script.async = true;
    script.nonce = "hRevMNbZ";
    script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=429146018231335";
    document.getElementsByTagName('head')[0].appendChild(script);
}

function loadGG() {
    const script = document.createElement('script');
    script.crossOrigin = "anonymous";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XZG88T09VQ";
    document.getElementsByTagName('head')[0].appendChild(script);

    <!-- Global site tag (gtag.js) - Google Analytics -->
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-XZG88T09VQ');
}

function highlight() {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block);
    });
}

function darkMode() {
    $('.toggle-track').on('click', function () {
        if (html.hasClass('dark-mode')) {
            html.removeClass('dark-mode');
            localStorage.setItem('alto_dark', false);
        } else {
            html.addClass('dark-mode');
            localStorage.setItem('alto_dark', true);
        }
    });
}


function carousel() {
    var carousel = $('.carousel');
    var postImage = carousel.find('.post-image');
    var imageHeight, nav;

    function moveNav() {
        imageHeight = postImage.height();
        if (!nav) {
            nav = carousel.find('.owl-prev, .owl-next');
        }
        nav.css({
            top: imageHeight / 2 + 'px',
            opacity: 1,
        });
    }

    carousel.owlCarousel({
        dots: false,
        margin: 20,
        nav: true,
        navText: [
            '<i class="icon icon-chevron-left"></i>',
            '<i class="icon icon-chevron-right"></i>',
        ],
        onInitialized: function () {
            moveNav();
        },
        onResized: function () {
            moveNav();
        },
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
    });
}

function video() {
    'use strict';
    $('.post-content').fitVids();
}

function gallery() {
    var images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    });
}

function author() {
    $('.author-name').on('click', function () {
        $(this).next('.author-social').toggleClass('enabled');
    });
}

function offCanvas() {
    var burger = jQuery('.burger');
    var canvasClose = jQuery('.canvas-close');

    jQuery('.main-menu .nav-list').slicknav({
        label: '',
        prependTo: '.mobile-menu',
    });

    burger.on('click', function () {
        html.toggleClass('canvas-opened');
        html.addClass('canvas-visible');
        dimmer('open', 'medium');
    });

    canvasClose.on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery('.dimmer').on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery(document).keyup(function (e) {
        if (e.keyCode == 27 && html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });
}

function dimmer(action, speed) {
    'use strict';

    var dimmer = jQuery('.dimmer');

    switch (action) {
        case 'open':
            dimmer.fadeIn(speed);
            break;
        case 'close':
            dimmer.fadeOut(speed);
            break;
    }
}
