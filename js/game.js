class Game{
    constructor(canvas, ctx){
       this.canvas = canvas;
       this.ctx = ctx;
       this.height = this.canvas.height;
       this.width = this.canvas.width;
       this.baseWidth = 800;
       this.maxLaser = 4; // default max laser
       this.currentLaser = 0; // current laser
       this.ratio = this.width / this.baseWidth;
       this.starsCollection = new Star(this); // create stars
       this.player = new Player(this); // create player
       this.enemy1 = new Enemy1(this); // create enemy1
       this.starsCollection.generateStars();
       this.enemyCollection1 = []; // create enemy
       this.enemy1Lasers = []; // create enemy laser
       this.addEnemy();
       
       this.resize(window.innerWidth, window.innerHeight);
       window.addEventListener("resize", (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
       });
    }

    addEnemy(){
        for (let i = 0; i < 10; i++) {
            const enemy = new Enemy1(this, -200 + i * 200);
            this.enemyCollection1.push(enemy);
        }
    }

    checkCollision(a, b){
        // check if a and b are colliding
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadii;
    }

    render(){
        this.starsCollection.draw();
        this.player.draw();
        this.player.update();
        this.starsCollection.movingStar();
        
        this.enemyCollection1.forEach(enemy => {
            enemy.draw();
            enemy.update();
        });

        this.drawLaserEnergy();
        this.drawHealth();
    }

    drawLaserEnergy(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "20px Arial";
        for (let i = this.maxLaser - this.currentLaser; i > 0; i--) {
            this.ctx.fillRect(i * 50, 10, 40, 40);
        }
        this.ctx.closePath();
    }

    drawHealth(){
        const startX = this.canvas.width;
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Arial";
        for (let i = this.player.playerHealth; i > 0; i--) {
            this.ctx.fillRect(startX - i * 50, 10, 40, 40);
        }
        this.ctx.closePath();
    }

    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.ratio = width / this.baseWidth;
        this.starsCollection.generateStars();
        this.player.resize();
        this.enemyCollection1.forEach(enemy => enemy.resize());
    }
}

window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const game = new Game(canvas, ctx);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        requestAnimationFrame(animate);
    }
    animate();
})
