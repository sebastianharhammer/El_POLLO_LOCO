class MoveableObject { 
    x = 120;
    y = 250;
    height = 150;
    width = 75;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log("Moving to right");
    }

    moveLeft() {
        console.log("Moving to left");
    }
}