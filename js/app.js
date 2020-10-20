const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "../img/BG.png";
const background2 = new Image();
background2.src = "../img/BG2.png";
const background3 = new Image();
background3.src = "../img/BG3.png";
const background4 = new Image();
background4.src = "../img/BG4.png";
const background5 = new Image();
background5.src = "../img/BG5.png";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;

  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background2, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background3, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background4, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background5, BG.x1, BG.y, BG.width, BG.height);

  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
  ctx.drawImage(background2, BG.x2, BG.y, BG.width, BG.height);
  ctx.drawImage(background3, BG.x2, BG.y, BG.width, BG.height);
  ctx.drawImage(background4, BG.x2, BG.y, BG.width, BG.height);
  ctx.drawImage(background5, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleBackground();
  handleObstacles();
  handleParticles();

  player.update();
  player.draw();

  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);

  handleCollisions();

  if (handleCollisions()) return;
  requestAnimationFrame(animate);

  angle += 0.12;
  hue++;
  frame++;
}

animate();

window.addEventListener("keydown", (e) => {
  e.code === "Space" && (spacePressed = true);
});

window.addEventListener("keyup", (e) => {
  e.code === "Space" && (spacePressed = false);
  player.frameX = 0;
});

const bang = new Image();
bang.src = "../img/bang.png";
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      player.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      player.x + player.width > obstaclesArray[i].x &&
      ((player.y < 0 + obstaclesArray[i].top && player.y + player.height > 0) ||
        (player.y > canvas.height - obstaclesArray[i].bottom &&
          player.y + player.height < canvas.height))
    ) {
      ctx.drawImage(bang, player.x, player.y, 50, 50);
      ctx.font = "25px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Game Over, your score is " + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
}
