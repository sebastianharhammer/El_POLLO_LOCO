class EndScreen extends DrawableObject {
    WIN_IMAGE = 'img/9_intro_outro_screens/win/win_2.png';
    LOSE_IMAGE = 'img/9_intro_outro_screens/game_over/game over.png';
    score = 0;
    timeBonus = 0;
    isVictory = false;
    buttons = [];
    isRestarting = false;


    constructor(coins, health, bottles, gameTime, isVictory) {
        super();
        this.isVictory = isVictory;
        this.loadImage(isVictory ? this.WIN_IMAGE : this.LOSE_IMAGE);
        this.x = 0;
        this.y = 0;
        this.height = 720;
        this.width = 1280;
        
        if (isVictory) {
            this.calculateScore(coins, health, bottles, gameTime);
        }

        this.createButtons();
        this.addClickListeners();
    }

    createButtons() {
        // Define button positions and sizes
        this.buttons = [
            {
                text: 'Play Again',
                x: this.width/2 - 100,
                y: 580,
                width: 200,
                height: 50,
                action: () => {
                    if (!this.isRestarting) {
                        this.isRestarting = true;
                        world.resetGame();
                        // Reset the flag after a delay
                        setTimeout(() => {
                            this.isRestarting = false;
                        }, 1000);
                    }
                }
            },
            {
                text: 'Main Menu',
                x: this.width/2 - 100,
                y: 650,
                width: 200,
                height: 50,
                action: () => {
                    if (!this.isRestarting) {
                        this.isRestarting = true;
                        world.resetGame();
                        world.showStartScreen();
                        setTimeout(() => {
                            this.isRestarting = false;
                        }, 1000);
                    }
                }
            }
        ];
    }


    addClickListeners() {
        document.addEventListener('click', (event) => {
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
        });

        // Add hover effect with scaling
        document.addEventListener('mousemove', (event) => {
            if (!this.isVisible()) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            const mouseX = (event.clientX - rect.left) * scaleX;
            const mouseY = (event.clientY - rect.top) * scaleY;

            this.buttons.forEach(button => {
                button.isHovered = this.isClickInButton(mouseX, mouseY, button);
            });
        });
    }

    isVisible() {
        // This should return true when the end screen is being displayed
        return world.gameOver;
    }

    isClickInButton(x, y, button) {
        return x >= button.x &&
               x <= button.x + button.width &&
               y >= button.y &&
               y <= button.y + button.height;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
        // Draw the main content
        ctx.font = '30px ZABARS';
        ctx.fillStyle = 'white';
        ctx.letterSpacing = '3px';
        ctx.textAlign = 'center';
        
        if (this.isVictory) {
            ctx.fillText(`Final Score: ${this.score}`, this.width/2, 220);
            ctx.font = '32px ZABARS';
            ctx.letterSpacing = '3px';
            ctx.fillText(`Time Bonus: ${this.timeBonus}`, this.width/2, 260);
        } 
        

        // Draw buttons
        this.buttons.forEach(button => {
            // Button background
            ctx.fillStyle = button.isHovered ? '#4CAF50' : '#45a049';
            ctx.beginPath();
            ctx.roundRect(button.x, button.y, button.width, button.height, 10);
            ctx.fill();

            // Button text
            ctx.font = '28px ZABARS';
            ctx.letterSpacing = '3px';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText(
                button.text,
                button.x + button.width/2,
                button.y + button.height/2
            );
        });
    }

    calculateScore(coins, health, bottles, gameTime) {
        const coinPoints = coins * 100;
        const healthPoints = health * 200;
        const bottlePoints = bottles * 50;
        this.timeBonus = Math.max(0, Math.floor((300 - gameTime) * 10));
        this.score = coinPoints + healthPoints + bottlePoints + this.timeBonus;
    }
}