/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /**
     * The image object representing the drawable object.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Cache to store loaded images.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * X-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * Y-coordinate of the drawable object.
     * @type {number}
     */
    y = 280;

    /**
     * Height of the drawable object.
     * @type {number}
     */
    height = 150;

    /**
     * Width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the drawable object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths.
     * @param {Array<string>} arr - Array containing paths to images.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path
            this.imageCache[path] = img;
        });
    }
}