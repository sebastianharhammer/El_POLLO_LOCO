/**
 * Represents the start screen of the game, handling the initial user interface
 * and game instructions display.
 */
class StartScreen {
  /** @type {number} X-coordinate position of the start screen */
  x = 0;
  /** @type {number} Y-coordinate position of the start screen */
  y = 0;
  /** @type {number} Width of the start screen in pixels */
  width = 1280;
  /** @type {number} Height of the start screen in pixels */
  height = 720;
  /** @type {HTMLImageElement} Background image for the start screen */
  img;
  /** @type {boolean} Flag to control instructions overlay visibility */
  showInstructions = false;
  /** @type {boolean} Flag to control impressum overlay visibility */
  showImpressum = false;

  /**
   * Creates a new StartScreen instance and initializes the start screen.
   */
  constructor() {
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png"); 
    this.createInstructionsButton();
    this.createImpressumButton();
    this.isTouchEnabled();
  }
  /**
   * Checks if touch events are enabled.
   * @returns {boolean} True if touch events are enabled, false otherwise.
   */
  isTouchEnabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
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
   * Creates and positions the instructions button.
   */
  createInstructionsButton() {
    if (window.innerWidth >= 1280 && !this.isTouchEnabled()) {
      this.instructionsBtn = this.createButton('Instructions');
      this.styleInstructionsButton();
      this.setupInstructionsButtonPosition();
      this.setupInstructionsButtonEvents();
      document.body.appendChild(this.instructionsBtn);
    }
  }

  /**
   * Applies styles to the instructions button.
   */
  styleInstructionsButton() {
    this.instructionsBtn.style.cssText = `
      position: absolute;
      font-family: ZABARS;
      font-size: 42px;
      padding: 10px 20px;
      cursor: pointer;
      background: transparent;
      color: white;
      border: none;
      border-radius: 5px;
    `;
  }

  /**
   * Sets up the position updating logic for the instructions button.
   */
  setupInstructionsButtonPosition() {
    const updateButtonPosition = () => {
      if (this.instructionsBtn) {
        const rect = canvas.getBoundingClientRect();
        this.instructionsBtn.style.left = `${rect.left + 50}px`;
        this.instructionsBtn.style.top = `${rect.top + 40}px`;
      }
    };
    
    window.addEventListener('resize', updateButtonPosition);
    updateButtonPosition();
  }

  /**
   * Sets up event listeners for the instructions button.
   */
  setupInstructionsButtonEvents() {
    this.instructionsBtn.addEventListener('click', () => {
      this.showInstructions = !this.showInstructions;
    });
  }

  /**
   * Creates and positions the impressum button.
   */
  createImpressumButton() {
    this.impressumBtn = this.createButton('Imprint');
    this.styleImpressumButton();
    this.setupImpressumButtonPosition();
    this.setupImpressumButtonEvents();
    document.body.appendChild(this.impressumBtn);
  }

  /**
   * Creates a basic button element with given text.
   * @param {string} text - The button text
   * @returns {HTMLButtonElement} The created button
   */
  createButton(text) {
    const button = document.createElement('button');
    button.innerText = text;
    return button;
  }

  /**
   * Applies styles to the impressum button.
   */
  styleImpressumButton() {
    this.impressumBtn.style.cssText = `
      position: absolute;
      font-family: ZABARS;
      font-size: 42px;
      padding: 10px 20px;
      cursor: pointer;
      background: transparent;
      color: white;
      border: none;
      border-radius: 5px;
    `;
  }

  /**
   * Sets up the position updating logic for the impressum button.
   */
  setupImpressumButtonPosition() {
    const updateButtonPosition = () => {
      const rect = canvas.getBoundingClientRect();
      this.impressumBtn.style.right = `${window.innerWidth - (rect.right - 50)}px`;
      if (window.innerWidth <= 1280) {
        this.impressumBtn.style.top = `${rect.top + 10}px`;
      } else {
        this.impressumBtn.style.top = `${rect.top + 40}px`;
      }
    };
    window.addEventListener('resize', updateButtonPosition);
    updateButtonPosition();
  }

  /**
   * Sets up event listeners for the impressum button.
   */
  setupImpressumButtonEvents() {
    this.impressumBtn.addEventListener('click', () => {
      this.showImpressum = !this.showImpressum;
    });
  }

  /**
   * Cleanup method to remove buttons when the start screen is no longer needed.
   */
  cleanup() {
    if (this.instructionsBtn) {
      document.body.removeChild(this.instructionsBtn);
      this.instructionsBtn = null;
    }
    if (this.impressumBtn) {
      document.body.removeChild(this.impressumBtn);
      this.impressumBtn = null;
    }
    this.showInstructions = false;
    this.showImpressum = false;
  }

  /**
   * Draws the complete start screen including background, title, and controls.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    this.drawBackground(ctx);
    this.drawMainTitle(ctx);

    if (window.innerWidth > 1280 && !this.isTouchEnabled()) {
       if (this.showInstructions) {
      this.drawInstructions(ctx);
    }
    this.drawDesktopControls(ctx); 
    } else {
      this.drawMobileControls(ctx);
    }

   
    if (this.showImpressum) {
      this.drawImpressum(ctx);
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
    if (window.innerWidth <= 1280 && this.isTouchEnabled()) {
      return;
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(20, 120, 300, 200);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "22px ZABARS";

    const instructionsText = [
      "KEYBOARD CONTROLS:",
      "ARROW LEFT - Walk left",
      "ARROW RIGHT - Walk right",
      "SPACE - Jump",
      "D - Throw bottle"
    ];

    instructionsText.forEach((text, index) => {
      ctx.fillText(text, 40, 160 + index * 30);
    });
  }

  /**
   * Draws the impressum overlay.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawImpressum(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    if (window.innerWidth <= 1280) {
    ctx.fillRect(this.width - 320, 300, 300, 280);
    } else {
      ctx.fillRect(this.width - 320, 100, 300, 280);
    }
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "12px Times New Roman";

    const impressumText = [
      "Responsible for Content:",
      "Information according to § 5 TMG",
      "Sebastian Harhammer",
      "Fort-Skelly-Straße 30",
      "93053 Regensburg",
      "Germany",
      "sebastian.harhammer@gmail.com",
      "All rights reserved"
    ];

    impressumText.forEach((text, index) => {
      if (window.innerWidth <= 1280) {
        ctx.fillText(text, this.width - 300, 340 + index * 30);
      } else {
        ctx.fillText(text, this.width - 300, 140 + index * 30);
      }
    });
  }
}
