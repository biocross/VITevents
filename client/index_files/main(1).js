// Scroll handler for animations on index and about us pages

$(window).scroll(function () {
    if (document.location.href.substring(document.location.href.indexOf("#") + 1) == "home") {
        redraw(-$(document).scrollTop());
    } else if (document.location.href.substring(document.location.href.indexOf("#") + 1) == "about") {
        redrawAbout(-$(document).scrollTop());
    } else {
        // Do nothing
    }
});

