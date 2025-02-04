class StartScreen {
  x = 0;
  y = 0;
  width = 1280;
  height = 720;
  img;
  showInstructions = false;
  showImpressum = false;

  constructor() {
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png"); // Adjust path to your image
    this.addInstructionsListener();
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  addInstructionsListener() {
    document.addEventListener("click", (e) => {
      if (
        e.clientX <= 300 &&
        e.clientY <= 550 &&
        e.clientX >= 100 &&
        e.clientY >= 400
      ) {
        this.showInstructions = !this.showInstructions;
      }
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    if (window.innerWidth >= 1280) {
      ctx.font = "82px ZABARS";
      ctx.letterSpacing = "3px";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Start Game", this.width / 2, 80);
      ctx.font = "38px ZABARS";
      ctx.fillText("Press ENTER to begin", this.width / 2, 120);

      ctx.textAlign = "center";
      ctx.font = "38px ZABARS";
      ctx.fillText("Instructions", 100, 70);
    }

    ctx.font = "38px ZABARS";
    ctx.fillText("⛶", 1000, 80);

    ctx.fillText("🔊", 1100, 80);
    document.addEventListener("keydown", (e) => {
      if (e.key === "m") {
        this.soundOn = !this.soundOn;
        console.log("soundOn", this.soundOn);
        ctx.fillText(this.soundOn ? "🔊" : "🔈", 1100, 80);
      }
    });

    ctx.fillText("🔈", 1200, 80);

    if (this.showInstructions) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(20, 100, 300, 200);

      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.font = "22px ZABARS";

      const instructions = [
        "CONTROLS:",
        "LEFT ARROW - Move left",
        "RIGHT ARROW - Move right",
        "SPACE - Jump",
        "D - Throw bottle",
      ];

      instructions.forEach((text, index) => {
        ctx.fillText(text, 40, 150 + index * 30);
      });
    }
  }
}
