class Laser{
    constructor(game, x, y, width, height, speed){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    resize(){
        this.width = 10 * this.game.ratio;
        this.height = 5 * this.game.ratio;
    }

    update(){
        this.y -= this.speed;
        console.log("move");
        if(this.y < 0){
            this.game.player.lasers.splice(this.game.player.lasers.indexOf(this), 1);
        }
    }

    draw(){
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}