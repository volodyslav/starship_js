class Star{
    constructor(game){
        this.game = game;
        this.stars = [];
    }

    movingStar(){
        for (const star of this.stars){
            star.y += 1;
            if(star.y > this.game.height){
                star.y = 0;
            }
        }
    }

    generateStars(){
        this.stars = []; // Array of Gamestars 
        for(let i = 0; i < this.game.width / 4; i++){
            const x = Math.random() * this.game.width;
            const y = Math.random() * this.game.height;
            const radius = Math.random() * 2 + 1;
            const colors = ["gold", "white", "gray"]
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.stars.push({x, y, radius, color})
        }  
    }

    draw(){
        for (const star of this.stars){
            this.game.ctx.beginPath();
            this.game.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.game.ctx.fillStyle = star.color;
            this.game.ctx.fill();
        }
    }
}