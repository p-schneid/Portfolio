
$( document ).ready(function() {
    
    $(".detail-border" ).click( function(event) {
        
        var selectedElement = $(event.target);
        
        var detail = selectedElement.parents('.detail');
        
        var details = detail.find('.details').first();
        var topBorder = detail.find('.detail-top-border').first();
        var bottomBorder = detail.find('.detail-bottom-border').first();

        var topBorderLabel = topBorder.find('label');
        var bottomBorderLabel = bottomBorder.find('label');

        var visible = details.css('display') === "block";

        details.slideToggle({duration:1000});
        bottomBorder.slideToggle();

        if (visible){
            // collapse
            var prompt = "See More!";
            topBorderLabel.text(prompt);
            bottomBorderLabel.text(prompt);
        } else {
            // expand
            var prompt = "See Less";
            topBorderLabel.text(prompt);
            bottomBorderLabel.text(prompt);
        }
        
    });

});