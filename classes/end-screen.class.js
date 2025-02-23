/**
 * Represents the end screen displayed after game completion or game over.
 * @extends DrawableObject
 */
class EndScreen extends DrawableObject {
    WIN_IMAGE = 'img/9_intro_outro_screens/win/win_2.png';
    LOSE_IMAGE = 'img/9_intro_outro_screens/game_over/game over.png';
    score = 0;
    timeBonus = 0;
    isVictory = false;
    buttons = [];
    isRestarting = false;
    showButtonsTimer = 0;
    world;

    /**
     * Creates an instance of EndScreen.
     * @param {number} coins - Number of coins collected
     * @param {number} health - Remaining health points
     * @param {number} bottles - Number of bottles collected
     * @param {number} gameTime - Total game time in seconds
     * @param {boolean} isVictory - Whether the game ended in victory
     */
    constructor(coins, health, bottles, gameTime, isVictory) {
        super();
        this.world = world;
        this.isVictory = isVictory;
        this.loadImage(isVictory ? this.WIN_IMAGE : this.LOSE_IMAGE);
        this.x = 0;
        this.y = 0;
        this.height = 720;
        this.width = 1280;
        
        if (isVictory) {
            this.world.soundManager.stopAll();
            this.world.soundManager.play("victory");
            this.calculateScore(coins, health, bottles, gameTime);
        }

        this.createButtons();
        this.addClickListeners();
    }

    /**
     * Creates interactive buttons for the end screen.
     * @private
     */
    createButtons() {
        this.buttons = [
            this.createPlayAgainButton(),
            this.createImprintButton()
        ];
    }

    /**
     * Creates the Play Again button configuration.
     * @private
     * @returns {Object} Button configuration object
     */
    createPlayAgainButton() {
        return {
            text: 'Play Again',
            x: this.width/2 - 210,
            y: 580,
            width: 200,
            height: 50,
            disabled: false,
            action: () => this.handlePlayAgainClick()
        };
    }

    /**
     * Creates the Imprint button configuration.
     * @private
     * @returns {Object} Button configuration object
     */
    createImprintButton() {
        return {
            text: 'Imprint',
            x: this.width/2 + 10,
            y: 580,
            width: 200,
            height: 50,
            disabled: false,
            action: () => window.location.href = './imprint.html'
        };
    }

    /**
     * Handles the click action for the Play Again button.
     * @private
     */
    handlePlayAgainClick() {
        if (!this.isRestarting && 
            !this.world?.gameManager?.isResetting && 
            !this.buttons[0].disabled) {
            
            this.buttons[0].disabled = true;
            this.buttons[0].text = 'Restarting...';
            this.isRestarting = true;
            setTimeout(() => {
                if (this.world?.gameManager) {
                    this.world.gameManager.resetGame();
                }
                setTimeout(() => {
                    this.isRestarting = false;
                    this.buttons[0].disabled = false;
                    this.buttons[0].text = 'Play Again';
                }, 750);
            }, 1000);
        }
    }

    /**
     * Adds click and mousemove event listeners for button interactions.
     * @private
     */
    addClickListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    /**
     * Handles click events on buttons.
     * @param {MouseEvent} event - The click event
     * @private
     */
    handleClick(event) {
        if (!this.isVisible()) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;
        this.buttons.forEach(button => {
            if (this.isClickInButton(clickX, clickY, button)) {
                button.action();
            }
        });
    }

    /**
     * Handles mouse movement for button hover effects.
     * @param {MouseEvent} event - The mousemove event
     * @private
     */
    handleMouseMove(event) {
        if (!this.isVisible()) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        this.buttons.forEach(button => {
            button.isHovered = this.isClickInButton(mouseX, mouseY, button);
        });
    }

    /**
     * Checks if the end screen should be visible.
     * @returns {boolean} True if the game is over
     */
    isVisible() {
        return this.world?.gameOver || false;
    }

    /**
     * Checks if a click/mouse position is within a button's bounds.
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {Object} button - Button object to check
     * @returns {boolean} True if the position is within the button
     */
    isClickInButton(x, y, button) {
        return x >= button.x &&
               x <= button.x + button.width &&
               y >= button.y &&
               y <= button.y + button.height;
    }

    /**
     * Draws the end screen with all its components.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        this.drawBackground(ctx);
        this.drawScoreInfo(ctx);
        this.handleButtonsDisplay(ctx);
    }

    /**
     * Draws the background image.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @private
     */
    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the score information if game was won.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @private
     */
    drawScoreInfo(ctx) {
        ctx.font = "30px ZABARS";
        ctx.fillStyle = "white";
        ctx.letterSpacing = "3px";
        ctx.textAlign = "center";

        if (this.isVictory) {
            ctx.fillText(`Final Score: ${this.score}`, this.width / 2, 220);
            ctx.font = "32px ZABARS";
            ctx.letterSpacing = "3px";
            ctx.fillText(`Time Bonus: ${this.timeBonus}`, this.width / 2, 260);
        }
    }

    /**
     * Handles the delayed display of buttons.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @private
     */
    handleButtonsDisplay(ctx) {
        if (this.showButtonsTimer >= 750) {
            this.drawButtons(ctx);
        } else {
            this.showButtonsTimer += 1000 / 60;
        }
    }

    /**
     * Draws all buttons on the screen.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @private
     */
    drawButtons(ctx) {
        this.buttons.forEach((button) => {
            this.drawButton(ctx, button);
        });
    }

    /**
     * Draws a single button with hover and disabled states.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @param {Object} button - Button object to draw
     * @private
     */
    drawButton(ctx, button) {
        ctx.fillStyle = button.disabled
            ? "#808080"
            : button.isHovered
            ? "#4CAF50"
            : "#45a049";
        ctx.beginPath();
        ctx.roundRect(button.x, button.y, button.width, button.height, 10);
        ctx.fill();
        ctx.font = "28px ZABARS";
        ctx.letterSpacing = "3px";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    }

    /**
     * Calculates the final score based on game statistics.
     * @param {number} coins - Number of coins collected
     * @param {number} health - Remaining health points
     * @param {number} bottles - Number of bottles collected
     * @param {number} gameTime - Total game time in seconds
     * @private
     */
    calculateScore(coins, health, bottles, gameTime) {
        const coinPoints = coins * 100;
        const healthPoints = health * 200;
        const bottlePoints = bottles * 50;
        this.timeBonus = Math.max(0, Math.floor((300 - gameTime) * 10));
        this.score = coinPoints + healthPoints + bottlePoints + this.timeBonus;
    }
}