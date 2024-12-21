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
    }

    resize(){
        this.width = this.game.ratio * this.spriteWidth;
        this.height = this.game.ratio * this.spriteHeight;
    }

    draw(){
        this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        this.speed = 10 * this.game.ratio;
    }

    update(){
        this.x += this.speed;
        if(this.x > this.game.width){
            this.y = 100;
            this.x = -2000;
        }
    }
}