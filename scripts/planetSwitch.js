// To avoid same planet on click
var page = 1;
var text = ['About Me', 'Resume', 'Contact'];

document.addEventListener('DOMContentLoaded', function() {
    var planet = document.getElementById('planetImage');

    var leftArrow = document.getElementById('leftKey');
    var rightArrow = document.getElementById('rightKey');
    var spaceKey = document.getElementById('spaceKey');

    document.addEventListener('keydown', function(event){
         
        if (event.key == 'a' || event.key == 'ArrowLeft'){
            page = page - 1 < 1 ? 1:page-1;

            var src = "/images/planet" + page + '.png';
            planet.src = src;
            document.getElementById('overlay').textContent = text[page-1];

            leftArrow.style.animationName = 'moveSpriteSheet';
            leftArrow.style.animationDuration = '0.1s';
            leftArrow.style.animationTimingFunction = 'steps(2)';

            leftArrow.addEventListener('animationend', function() {
                leftArrow.style.animationName = '';
                leftArrow.style.animationDuration = '';
                leftArrow.style.animationTimingFunction = '';
            });
        }
        else if (event.key == 'd' || event.key == 'ArrowRight'){
            page = page+1 > 3 ? 3 : page+1;

            var src = "/images/planet" + page + '.png';
            planet.src = src;
            document.getElementById('overlay').textContent = text[page-1];

            rightArrow.style.animationName = 'moveSpriteSheet';
            rightArrow.style.animationDuration = '0.1s';
            rightArrow.style.animationTimingFunction = 'steps(2)';

            rightArrow.addEventListener('animationend', function() {
                rightArrow.style.animationName = '';
                rightArrow.style.animationDuration = '';
                rightArrow.style.animationTimingFunction = '';
            });
        }
        else if (event.key == ' ') {
            spaceKey.style.animationName = 'moveSpriteSheet';
            spaceKey.style.animationDuration = '0.1s';
            spaceKey.style.animationTimingFunction = 'steps(2)';

            spaceKey.addEventListener('animationend', function() {
                spaceKey.style.animationName = '';
                spaceKey.style.animationDuration = '';
                spaceKey.style.animationTimingFunction = '';
            });
        }

    }, false);

    leftArrow.addEventListener('click', function(){

        page = page - 1 < 1 ? 1:page-1;

        var src = "/images/planet" + page + '.png';
        planet.src = src;
        document.getElementById('overlay').textContent = text[page-1];

        leftArrow.style.animationName = 'moveSpriteSheet';
        leftArrow.style.animationDuration = '0.1s';
        leftArrow.style.animationTimingFunction = 'steps(2)';

        leftArrow.addEventListener('animationend', function() {
            leftArrow.style.animationName = '';
            leftArrow.style.animationDuration = '';
            leftArrow.style.animationTimingFunction = '';
        });

    }, false);

    rightArrow.addEventListener('click', function(){
        
        page = page+1 > 3 ? 3 : page+1;

        var src = "/images/planet" + page + '.png';
        planet.src = src;
        document.getElementById('overlay').textContent = text[page-1];

        rightArrow.style.animationName = 'moveSpriteSheet';
        rightArrow.style.animationDuration = '0.1s';
        rightArrow.style.animationTimingFunction = 'steps(2)';

        rightArrow.addEventListener('animationend', function() {
            rightArrow.style.animationName = '';
            rightArrow.style.animationDuration = '';
            rightArrow.style.animationTimingFunction = '';
        });

    }, false);

    spaceKey.addEventListener('click', function(){
        spaceKey.style.animationName = 'moveSpriteSheet';
        spaceKey.style.animationDuration = '0.1s';
        spaceKey.style.animationTimingFunction = 'steps(2)';

        spaceKey.addEventListener('animationend', function() {
            spaceKey.style.animationName = '';
            spaceKey.style.animationDuration = '';
            spaceKey.style.animationTimingFunction = '';
        });
    }, false);
});
