const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreboard');
const gameOverText = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

const gridSize = 20;
let snake, food, dx, dy, score, lastScore, gameInterval;

function initGame() {
  snake = [{ x: 160, y: 200 }];
  dx = gridSize;
  dy = 0;
  score = 0;
  food = randomFood();
  updateScore();
  gameOverText.style.display = 'none';
  restartBtn.style.display = 'none';
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();
    updateScore();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function updateScore() {
  scoreBoard.innerText = `Punkti: ${score} | Pēdējais rezultāts: ${lastScore || 0}`;
}

function gameOver() {
  clearInterval(gameInterval);
  lastScore = score;
  gameOverText.style.display = 'block';
  restartBtn.style.display = 'inline-block';
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (dy === 0) { dx = 0; dy = -gridSize; } break;
    case 'ArrowDown': if (dy === 0) { dx = 0; dy = gridSize; } break;
    case 'ArrowLeft': if (dx === 0) { dx = -gridSize; dy = 0; } break;
    case 'ArrowRight': if (dx === 0) { dx = gridSize; dy = 0; } break;
  }
});

restartBtn.addEventListener('click', initGame);

initGame();
