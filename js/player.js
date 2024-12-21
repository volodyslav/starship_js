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

        // Movements
        window.addEventListener("keydown", (e) => {
            if((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && this.x < this.game.width - this.width){
                this.x += this.speed;
            }
            if((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && this.x > 0){
                this.x -= this.speed;
            }
            if(e.key === " "){
                const laser = new Laser(this.game, this.x + this.width / 2, this.y, 10, 5, 5)
                this.lasers.push(laser);
            }
        });
    }
    

    resize(){
        this.height = this.game.ratio * this.spriteHeight;
        this.width = this.game.ratio * this.spriteWidth;
        this.collisionRadius = 20 * this.game.ratio;
        this.lasers.forEach(laser => laser.resize());
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
        
        this.lasers.forEach(laser => laser.update());
    }
    draw(){
        this.game.ctx.drawImage(this.starship, this.x, this.y, this.width, this.height);
        this.game.ctx.beginPath();
        this.game.ctx.ellipse(
            this.collisionX + this.collisionRadius * 0.02, 
            this.collisionY - this.collisionRadius * 0.1, 
            this.collisionRadius * 0.5,                     
            this.collisionRadius * 1.1,             
            0,                                            
            0,                                            
            Math.PI * 2                                   
        );
        this.game.ctx.strokeStyle = "white";
        this.game.ctx.lineWidth = 5;
        this.game.ctx.stroke();
        this.lasers.forEach(laser => laser.draw());
    }
}