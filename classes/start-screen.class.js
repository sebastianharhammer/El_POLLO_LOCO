class StartScreen {
    x = 0;
    y = 0;
    width = 1280;
    height = 720;
    img;
    showInstructions = false;


    constructor() {
        this.loadImage('img/9_intro_outro_screens/start/startscreen_1.png'); // Adjust path to your image
        this.addInstructionsListener();
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    addInstructionsListener() {
        document.addEventListener('click', (e) => {
            // Check if click is in instructions button area (top left)
            if (e.clientX <= 1000 && e.clientY <= 150) {
                this.showInstructions = !this.showInstructions;
            }
        });
    }

    draw(ctx) {
        // Draw background
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
        // Draw "Start Game" text at top middle
        ctx.font = '82px ZABARS';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Start Game', this.width / 2, 80);
        ctx.font = '24px ZABARS';
        ctx.fillText('Press ENTER to begin', this.width / 2, 120);

        // Draw instructions button (top left)
        ctx.textAlign = 'center';
        ctx.font = '38px ZABARS';
        ctx.fillText('Instructions', 100, 70);


        // Draw instructions if showInstructions is true
        if (this.showInstructions) {
            // Semi-transparent background for instructions
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(20, 60, 250, 200);
            
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.font = '18px ZABARS';
            
            const instructions = [
                'CONTROLS:',
                'LEFT ARROW - Move left',
                'RIGHT ARROW - Move right',
                'SPACE - Jump',
                'D - Throw bottle'
            ];

            instructions.forEach((text, index) => {
                ctx.fillText(text, 30, 90 + (index * 30));
            });
        }
    }
} 