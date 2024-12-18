class Game{
    constructor(canvas, ctx){
       this.canvas = canvas;
       this.ctx = ctx;
       this.height = this.canvas.height;
       this.width = this.canvas.width;
    }

    render(){
        
    }
}

window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 600;
    canvas.width = 800;

    const game = new Game(canvas, ctx);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        requestAnimationFrame(animate);
    }
    animate();
})
