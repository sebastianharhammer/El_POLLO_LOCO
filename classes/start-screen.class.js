/**
 * Represents the start screen of the game, handling the initial user interface
 * and game instructions display.
 */
class StartScreen {
  x = 0;
  y = 0;
  width = 1280;
  height = 720;
  img;
  showInstructions = false;
  showImpressum = false;

  /**
   * Creates a new StartScreen instance and initializes the start screen.
   */
  constructor() {
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png"); // Adjust path to your image
    this.addInstructionsListener();
  }

  /**
   * Loads the background image for the start screen.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Adds a click event listener to toggle the instructions display.
   */
  addInstructionsListener() {
    document.addEventListener("click", (e) => {
      if (
        e.clientX <= 400 &&
        e.clientY <= 650 &&
        e.clientX >= 100 &&
        e.clientY >= 350
      ) {
        this.showInstructions = !this.showInstructions;
      }
    });
  }

  /**
   * Draws the complete start screen including background, title, and controls.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    this.drawBackground(ctx);
    this.drawMainTitle(ctx);

    if (window.innerWidth > 1280) {
      this.drawDesktopControls(ctx);
    } else {
      this.drawMobileControls(ctx);
    }

    if (this.showInstructions) {
      this.drawInstructions(ctx);
    }
  }

  /**
   * Draws the background image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawBackground(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the main title text on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawMainTitle(ctx) {
    ctx.font = "82px ZABARS";
    ctx.letterSpacing = "3px";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Start Game", this.width / 2, 80);
  }

  /**
   * Draws the desktop-specific control instructions.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawDesktopControls(ctx) {
    ctx.font = "38px ZABARS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Press ENTER to begin", this.width / 2, 120);

    ctx.font = "42px ZABARS";
    ctx.fillText("Instructions", 150, 70);
  }

  /**
   * Draws the mobile-specific control instructions.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawMobileControls(ctx) {
    ctx.font = "42px ZABARS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Tap to begin", this.width / 2, 120);
  }

  /**
   * Draws the game instructions overlay with control mappings.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawInstructions(ctx) {
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
