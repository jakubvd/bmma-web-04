// hover cards 3 columns
$(document).ready(function() {
    // Check if the screen width is above a certain threshold (e.g., 992p or above)
    if (window.innerWidth >= 992) {
        $(".hover_card").hover(function() {
            // When a card is hovered over
            $(".hover_card_card-content").not($(this).find(".hover_card_card-content")).addClass("inactive");
        }, function() {
            // When the mouse leaves a card
            $(".hover_card_card-content").removeClass("inactive");
        });
    }
});