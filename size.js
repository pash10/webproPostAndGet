$(document).ready(function() {
    function adjustBackground() {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var aspectRatio = $(window).width() / $(window).height();
        if (isMobile) {
            // This is a mobile device, adjust the background size based on aspect ratio
            if (aspectRatio > 1) {
                // Landscape
                $("body.index").css("background-size", "cover");
            } else {
                // Portrait
                $("body.index").css("background-size", "contain");
            }
        } else {
            // This is not a mobile device, always cover the background
            $("body.index").css("background-size", "cover");
        }
    }
    adjustBackground();
    $(window).on('resize orientationchange', adjustBackground);
});
