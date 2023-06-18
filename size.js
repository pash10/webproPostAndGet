// The jQuery $(document).ready function ensures that this script runs once the HTML document is fully loaded
$(document).ready(function() {

    // This function adjusts the background image size based on the device and its orientation
    function adjustBackground() {
        // Determine if the device is a mobile device
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // Calculate the aspect ratio of the window (width / height)
        var aspectRatio = $(window).width() / $(window).height();

        // If it is a mobile device, adjust the background image based on the aspect ratio
        if (isMobile) {
            // If the aspect ratio is greater than 1, the device is in landscape mode
            if (aspectRatio > 1) {
                // In landscape mode, we use "cover" so the background image covers the entire background
                $("body.index").css("background-size", "cover");
            } else {
                // In portrait mode, we use "contain" to make sure the image fits within the screen without being cropped
                $("body.index").css("background-size", "contain");
            }
        } else {
            // If it's not a mobile device, we always use "cover" to make the image cover the entire background
            $("body.index").css("background-size", "cover");
        }
    }

    // Initially apply the background adjustment
    adjustBackground();

    // Whenever the window is resized or the orientation changes, adjust the background
    $(window).on('resize orientationchange', adjustBackground);
});
