const WIDTH = 20;
const HEIGHT = 20;

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

let cavasWidth;
let scale;
let scoreDisplay;

window.addEventListener("load", function() {
  const platno = document.getElementById("platno");
  scoreDisplay = document.getElementById("score");
  canvasWidth = platno.getBoundingClientRect().width;
  platno.setAttribute("height", canvasWidth);
  scale = canvasWidth / WIDTH;
  const ctx = platno.getContext("2d");
  startGame(ctx);
});

const startGame = function(ctx) {
  const had = [[0, 0]];
  let fruit = spawnFruit();
  let puvodniSmer = RIGHT;
  let smer = RIGHT;

  let tick = 200;
  let score = 0;

  window.addEventListener("keyup", function(e) {
    smer = changeDirection(puvodniSmer, e.keyCode);
  });
  const game = function() {
    //apdejt stavu hry
    const hlava = had[had.length - 1];
    const novaHlava = vypocitejHlavu(smer, hlava);
    puvodniSmer = smer;

    had.push(novaHlava);
    //sežrání
    if (novaHlava[0] === fruit[0] && novaHlava[1] === fruit[1]) {
      fruit = spawnFruit();
      scoreDisplay.innerText = ++score;
      if (tick > 50) tick = tick - 10;
    } else {
      had.shift();
    }

    console.log(had.length);

    //začátek rendru
    render(ctx, had, fruit);
    setTimeout(game, tick);
  };
  game();
};

const render = function(ctx, had, fruit) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasWidth);

  ctx.fillStyle = "lightgreen";
  ctx.fillRect(fruit[0] * scale, fruit[1] * scale, scale, scale);

  had.forEach(function(clanek) {
    ctx.fillStyle = "maroon";
    ctx.fillRect(clanek[0] * scale, clanek[1] * scale, scale, scale);
  });
};

const vypocitejHlavu = function(smer, puvodniHlava) {
  const x = puvodniHlava[0];
  const y = puvodniHlava[1];
  switch (smer) {
    case RIGHT:
      return [orez(x + 1), orez(y + 0)];
    case DOWN:
      return [orez(x + 0), orez(y + 1)];
    case LEFT:
      return [orez(x - 1), orez(y + 0)];
    case UP:
      return [orez(x + 0), orez(y - 1)];
    default:
      Error("neznamy smer");
  }
};

const spawnFruit = function() {
  return [getRandomInt(0, HEIGHT - 1), getRandomInt(0, WIDTH - 1)];
};

const changeDirection = function(smer, key) {
  switch (key) {
    case 40:
      if (smer !== UP) return DOWN;
    case 37:
      if (smer !== RIGHT) return LEFT;
    case 39:
      if (smer !== LEFT) return RIGHT;
    case 38:
      if (smer !== DOWN) return UP;
    default:
      return smer;
  }
};

const orez = function(x) {
  if (x < 0) return 0;
  if (x > WIDTH - 1) return WIDTH - 1;
  return x;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
