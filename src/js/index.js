/*? no js js needed from me */
const kanvas = document.getElementById("kanvas");
const score = document.getElementById("score");

function random() {
  return ~~(Math.random() * 15) + 1;
}

let config = {
  speed: 125,
  player: {
    x: random(),
    y: random(),
  },
  food: {
    x: random(),
    y: random(),
  },
  score: {
    scorePlayer: 0,
    poin: 5,
  },
  level: {
    defaultLevel: 0,
    tambahLevel: 1,
  },
  velocity: {
    x: 0,
    y: 0,
  },
};

const games = {
  createPlayer() {
    kanvas.innerHTML = `<div class="player" style="grid-area: ${config.player.x} / ${config.player.y}"></div>`;
  },
  createFood() {
    kanvas.innerHTML += `<div class="food" style="grid-area: ${config.food.x} / ${config.food.y}"></div>`;
  },
  movePlayer() {
    config.player.x += config.velocity.x;
    config.player.y += config.velocity.y;
  },
  resetPlayerPosition() {
    if (config.player.x <= 0) {
      config.player.x = 1;
    } else if (config.player.x >= 16) {
      config.player.x = 15;
    } else if (config.player.y <= 0) {
      config.player.y = 1;
    } else if (config.player.y >= 16) {
      config.player.y = 15;
    }
  },
  isWin() {
    if (config.player.x == config.food.x && config.player.y == config.food.y) {
      config.score.scorePlayer += config.score.poin;
      return true;
    }
    return false;
  },
  levelTambah() {
    switch (config.score.scorePlayer) {
      case "10":
        return console.log("naik level");
        break;
    }
  },
  randomFoodPosition() {
    config.food.x = random();
    config.food.y = random();
  },
};

const moveAtas = () => {
  config.velocity.x = -1;
  config.velocity.y = 0;
};
const moveBawah = () => {
  config.velocity.x = 1;
  config.velocity.y = 0;
};
const moveMaju = () => {
  config.velocity.x = 0;
  config.velocity.y = -1;
};
const moveMundur = () => {
  config.velocity.x = 0;
  config.velocity.y = 1;
};

const movement = (listen) => {
  switch (listen.key) {
    case "w":
      config.velocity.x = -1;
      config.velocity.y = 0;
      break;

    case "s":
      config.velocity.x = 1;
      config.velocity.y = 0;
      break;

    case "a":
      config.velocity.x = 0;
      config.velocity.y = -1;
      break;

    case "d":
      config.velocity.x = 0;
      config.velocity.y = 1;
      break;
  }
};

const start = () => {
  games.createPlayer();
  games.createFood();
  games.movePlayer();
  games.resetPlayerPosition();

  const win = games.isWin();
  if (win) {
    score.innerHTML = `<p>${config.score.scorePlayer}</p>`;
    games.randomFoodPosition();
  }

  games.levelTambah();
};

setInterval(start, config.speed);
document.addEventListener("keydown", movement);
