function changeImage() {
    var image = document.getElementById('planet'); // Get the image element by its ID
    var src = "/images/planet" + getRandomInt(1, 3) + '.png';
    image.src = src;
}