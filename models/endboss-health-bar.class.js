class endbossHealthBar extends DrawableObject {
    IMAGES = [
     'img/7_statusbars/2_statusbar_endboss/green/green0.png',  // 0
     'img/7_statusbars/2_statusbar_endboss/green/green20.png',
     'img/7_statusbars/2_statusbar_endboss/green/green40.png',
     'img/7_statusbars/2_statusbar_endboss/green/green60.png',
     'img/7_statusbars/2_statusbar_endboss/green/green80.png',
     'img/7_statusbars/2_statusbar_endboss/green/green100.png', // 5
    ];
    endbossHealth = 15;
 
    constructor() {
     super();
     this.loadImages(this.IMAGES);
     this.x = 500;
     this.y = 420;
     this.width = 200;
     this.height = 60;
     this.setEndbossHealth(15);
    }
 
    // set Percentage(50);
    setEndbossHealth(endbossHealth) {
     this.endbossHealth = endbossHealth;
     let path = this.IMAGES[this.resolveImageIndex()];
     this.img = this.imageCache[path];
    }
 
     resolveImageIndex() {
         if(this.endbossHealth == 15) {
             return 5;
         } else if (this.endbossHealth == 12) {
             return 4;
         } else if (this.endbossHealth == 9) {
             return 3;
         } else if (this.endbossHealth == 6) {
             return 2;
         } else if (this.endbossHealth == 3) {
             return 1;
         } else {
             return 0;
         }
     }
}