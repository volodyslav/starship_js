class Enemy{
    constructor(game){
        this.game = game;
        this.size = 50; // size of the enemy ship
        this.spriteWidth = this.size;
        this.spriteHeight = this.size;
        this.x;
        this.y;
        this.width;
        this.height;
        this.speed;
        this.image;
        this.collisionX;
        this.collisionY; 
        this.collisionRadius = this.spriteWidth * 0.4;
        
    }

    removeEnemy(){
        for (let i = 0; i < this.game.player.lasers.length; i++) {
            const laser = this.game.player.lasers[i];
            if(this.game.checkCollision(this, laser)){
                console.log("hit");
                const enemyIndex = this.game.enemyCollection1.indexOf(this);
                this.game.player.lasers.splice(i, 1);
                this.game.currentLaser--;
                if (enemyIndex > -1) {
                    this.game.enemyCollection1.splice(enemyIndex, 1);
                }
            }
        }
    }

    resize(){
        this.width = this.game.ratio * this.spriteWidth;
        this.height = this.game.ratio * this.spriteHeight;
        this.collisionRadius = this.width * 0.4;
    }

    
}

class Enemy1 extends Enemy{
    constructor(game, x){
        super(game);
        this.image = document.querySelector("#enemy1");
        this.x = x;
        this.y = 100;
        this.width;
        this.height;
        this.speed = 4 * this.game.ratio;
        this.enemy1Lasers = [];

        this.spawnLaser();
    }

    spawnLaser(){
        setInterval(() => {
            const laser = new EnemyLaser(this.game, this.collisionX, this.collisionY, 4, 20, 4);
            this.enemy1Lasers.push(laser);
        }, Math.random() * 2000 + 1000); 
    }

    update(){
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
        this.x += this.speed;
        if(this.x > this.game.width){
            this.y = 100;
            this.x = -2000;
        }
        this.removeEnemy();
        this.enemy1Lasers.forEach(laser => laser.update());

    }
    draw(){
        this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        this.game.ctx.stroke();
        this.enemy1Lasers.forEach(laser => laser.draw());
    }
}