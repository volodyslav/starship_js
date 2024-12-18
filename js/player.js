class Player{
    constructor(game){
        this.game = game;
        this.starship = document.querySelector('#starship');
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.width;
        this.height;
    }

    draw(){
        this.game.ctx.drawImage(this.starship, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}