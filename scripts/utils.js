function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up the minimum value to the nearest integer
    max = Math.floor(max); // Round down the maximum value to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min (inclusive) and max (inclusive)
}