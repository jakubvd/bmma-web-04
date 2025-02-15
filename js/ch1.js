$(document).ready(function() {
    // Check if the screen width is above a certain threshold (e.g., 992p or above)
    if (window.innerWidth >= 992) {
        $(".layout423_card").hover(function() {
            // When a card is hovered over
            $(".layout423_card-content").not($(this).find(".layout423_card-content")).addClass("inactive");
        }, function() {
            // When the mouse leaves a card
            $(".layout423_card-content").removeClass("inactive");
        });
    }
});