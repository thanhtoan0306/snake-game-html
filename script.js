const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let snake = [{x: 200, y: 200}];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
}

function updateGame() {
    const head = { ...snake[0] };
    
    if (direction === "LEFT") head.x -= 20;
    else if (direction === "UP") head.y -= 20;
    else if (direction === "RIGHT") head.x += 20;
    else if (direction === "DOWN") head.y += 20;

    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        food = spawnFood();
        score++;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision()) {
        alert("Game Over! Score: " + score);
        snake = [{x: 200, y: 200}];
        direction = "RIGHT";
        score = 0;
        food = spawnFood();
    }
}

function snakeCollision() {
    return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));

    updateGame();
}

setInterval(drawGame, 100);
