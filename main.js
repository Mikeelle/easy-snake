const WIDTH =500
const HEIGHT =500
const STEP = 100
window.addEventListener("load",function(){
    const platno = document.getElementById("platno")
    const ctx = platno.getContext('2d');
    startGame(ctx)
})

const startGame = function(ctx) {
    const had = [[0,0]]
    let smer = 0
    window.addEventListener("keyup", function(e){
        switch(e.keyCode) {
            case 40:
                smer=1
                break
            case 37:
                smer=2
                break
            case 39:
                smer=0
                break
            case 38:
                smer=3
                break
        }
    })
    const game = function(){
        const hlava = had[0]
        const novaHlava = vypocitejHlavu(smer, hlava)
        had.push(novaHlava)
        had.shift()
        render(ctx, had)
        setTimeout(game, 300)        
    }
    game()
}

const render = function(ctx, had) {
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    had.forEach(function(clanek){
        ctx.fillStyle = 'green'
        ctx.fillRect(clanek[0]*STEP, clanek[1]*STEP, 100, 100)
    })
}

const vypocitejHlavu = function(smer, puvodniHlava) {
    const x = puvodniHlava[0]
    const y = puvodniHlava[1]
    switch(smer)  {
        case 0: return [x + 1, y + 0]
        case 1: return [x + 0, y + 1]
        case 2: return [x - 1, y + 0]
        case 3: return [x + 0, y - 1]
        default: Error("neznamy smer")
    }
    
}