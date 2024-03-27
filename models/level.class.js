class Level {
    chickens;
    smallchickens;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

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