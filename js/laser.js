class Laser{
    constructor(game, x, y, width, height, speed){
        this.game = game;
        this.x = x;
        this.y = y;
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.collisionRadius = this.height / 2;
    }

    resize(){
        this.width = 10 * this.game.ratio;
        this.height = 5 * this.game.ratio;
        this.collisionRadius = this.height / 2;
    }
}

class PlayerLaser extends Laser {
    constructor(game, x, y, width, height, speed){
        super(game, x, y, width, height, speed);
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
        this.y -= this.speed;
        if(this.y < 0){
            this.game.player.lasers.splice(this.game.player.lasers.indexOf(this), 1);
            this.game.currentLaser--;
        }
    }

    draw(){
        this.game.ctx.fillStyle = "yellow";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class EnemyLaser extends Laser {
    constructor(game, x, y, width, height, speed){
        super(game, x, y, width, height, speed);
        this.canTouchPlayer = true;
    }

    removePlayerHealth(){
        if(this.game.checkCollision(this, this.game.player) && this.canTouchPlayer){
            this.canTouchPlayer = false; // the laser is already 
            this.game.player.playerHealth--;   
        }
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
        this.y += this.speed;
        if(this.y > this.game.height){
            this.game.enemy1.enemy1Lasers.splice(this.game.enemy1.enemy1Lasers.indexOf(this), 1);
        }
        this.removePlayerHealth();
    }

    draw(){
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}