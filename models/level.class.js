/**
 * Represents a level in the game.
 */
class Level {
    chickens;
    smallchickens;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Constructs a new Level object.
     * @param {Array} chickens - An array of Chicken objects.
     * @param {Array} smallchickens - An array of smallChicken objects.
     * @param {Array} endboss - An array containing the Endboss object.
     * @param {Array} clouds - An array of Cloud objects.
     * @param {Array} backgroundObjects - An array of BackgroundObject objects.
     * @param {Array} coins - An array of Coin objects.
     * @param {Array} bottles - An array of Bottle objects.
     */
    constructor(chickens, smallchickens, endboss, clouds, backgroundObjects, coins, bottles) {
        this.chickens = chickens;
        this.smallchickens = smallchickens;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}