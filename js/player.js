class Player{
    constructor(game){
        this.game = game;
        this.starship = document.querySelector('#starship');
        this.size = 50; // size of the starship
        this.spriteWidth = this.size;
        this.spriteHeight = this.size;
        this.x = (window.innerWidth / 2 - this.size / 2) ;
        this.y = window.innerHeight - this.size * 3;
        this.width;
        this.height;
        this.speed = 100 * this.game.ratio;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.lasers = [];
        this.playerHealth = 3;

        // Movements
        window.addEventListener("keydown", (e) => {
            if((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && this.x < this.game.width - this.width){
                this.x += this.speed;
            }
            if((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && this.x > 0){
                this.x -= this.speed;
            }
            if(e.key === " " && this.game.currentLaser < this.game.maxLaser){
                const laser = new PlayerLaser(this.game, this.x + this.width / 2, this.y, 2, 20, 5)
                this.lasers.push(laser);
                this.game.currentLaser++;
            }
        });
    }
    
    

    resize(){
        this.height = this.game.ratio * this.spriteHeight;
        this.width = this.game.ratio * this.spriteWidth;
        this.collisionRadius = 16 * this.game.ratio;
        this.lasers.forEach(laser => laser.resize());
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;

        this.lasers.forEach(laser => laser.update());
        this.checkHealth();
    }
    checkHealth(){
        if(this.playerHealth <= 0){
            this.game.startGame = false;
        }
    }

    draw(){
        this.game.ctx.drawImage(this.starship, this.x, this.y, this.width, this.height);
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2                                   
        );
        this.game.ctx.strokeStyle = "white";
        this.game.ctx.lineWidth = 5;
        this.game.ctx.stroke();
        this.lasers.forEach(laser => laser.draw());
    }
}