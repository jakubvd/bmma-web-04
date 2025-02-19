// hover cards 2 columns
$(document).ready(function() {
    // Check if the screen width is above a certain threshold (e.g., 768px)
    if (window.innerWidth >= 992) {
        $(".hover_card_2cols").hover(function() {
            // When a card is hovered over
             $(".hover_card_2cols_content").not($(this).find(".hover_card_2cols_content")).addClass("inactive");
        }, function() {
            // When the mouse leaves a card
            $(".hover_card_2cols_content").removeClass("inactive");
        });
    }
});