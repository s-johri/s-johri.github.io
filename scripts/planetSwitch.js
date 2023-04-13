// To avoid same planet on click
var last = 1;

document.addEventListener('DOMContentLoaded', function() {
    var planet = document.getElementById('planetImage');

    planet.addEventListener('click', function() {
        // prevent choosing the same image
        var next = getRandomInt(1, 3);
        while (next == last) {
            var next = getRandomInt(1, 3); 
        } 
        last = next;

        var src = "/images/planet" + next + '.png';
        planet.src = src;

    });

    planet.addEventListener('touchstart', function(event) {
        // Prevent the default behavior of touch event (e.g., scrolling)
        event.preventDefault();
        
        // prevent choosing the same image
        var next = getRandomInt(1, 3);
        while (next == last) {
            var next = getRandomInt(1, 3); 
        } 
        last = next;

        var src = "/images/planet" + next + '.png';
        planet.src = src;

    });
});
