class Player{
    constructor(game){
        this.game = game;
        this.starship = document.querySelector('#starship');
        this.size = 100; // size of the starship
        this.spriteWidth = this.size;
        this.spriteHeight = this.size;
        this.x = this.game.width;
        this.y = this.game.height;
        this.width;
        this.height;
        this.speed = 100 * this.game.ratio;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;

        // Movements
        window.addEventListener("keydown", (e) => {
            if((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && this.x < this.game.width - this.width){
                this.x += this.speed;
            }
            if((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && this.x > 0){
                this.x -= this.speed;
            }
            if((e.key === "ArrowUp" || e.key.toLowerCase() === "w") && this.y > 0){
                this.y -= this.speed;
            }
            if((e.key === "ArrowDown" || e.key.toLowerCase() === "s") && this.y < this.game.height - this.height){
                this.y += this.speed;
            }
        });
    }
    

    resize(){
        this.height = this.game.ratio * this.spriteHeight;
        this.width = this.game.ratio * this.spriteWidth;
        this.collisionRadius = 20 * this.game.ratio;
        
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
    }
    draw(){
        this.game.ctx.drawImage(this.starship, this.x, this.y, this.width, this.height);
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX + this.collisionRadius * 0.05, this.collisionY - this.collisionRadius * 0.9, this.collisionRadius, 0, Math.PI * 2);
        this.game.ctx.strokeStyle = "white";
        this.game.ctx.lineWidth = 5;
        this.game.ctx.stroke();
    }
}