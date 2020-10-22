const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let hueOp = 0.7;
let frame = 0;
let score = 0;
var gamespeed = 0;
var obst = 0;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#000");
// gradient.addColorStop("0.5", "#101010");
// gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#2F2139");
gradient.addColorStop("0.9", "#FFF7E2");

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

  // player handling
  player.update();
  player.draw();

  // Score Styling and positioning
  ctx.fillStyle = gradient;
  ctx.font = "60px Verdana";

  let tempScore = 530;

  if (score.toString().length != 1) {
    if (score.toString().length >= 2) {
      tempScore -= 40 * (score.toString().length - 1);
    }
  }

  ctx.strokeText(score, tempScore, 70);
  ctx.fillText(score, tempScore, 70);

  // Collision handling
  handleCollisions();

  if (handleCollisions()) {
    return true;
  }

  requestAnimationFrame(animate);

  angle += 0.12;
  hue++;
  if (hueOp < 0) {
    hueOp = 0.6;
  } else {
    hueOp -= 0.01;
  }
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
      i != obstaclesArray.length - 1 &&
      obstaclesArray.length != 0 &&
      // [HORIZONTAL POSITON] back-side player << right-side obstacle
      player.x + 2 < obstaclesArray[i].x + obstaclesArray[i].width &&
      // [HORIZONTAL POSITON] front-side player >> left-side obstacle
      player.x + player.width - 3 > obstaclesArray[i].x &&
      // [VERTICAL POSITION]
      // top-side player << bottom-side of top obstacle
      ((player.y + 1.5 < obstaclesArray[i].top &&
        // bottom-side player >> 0
        player.y + player.height > 0) ||
        // top-side player >> top-side of bottom obstacle
        (player.y + player.height >
          canvas.height - obstaclesArray[i].bottom + 4 &&
          // bottom-side player << bottom-side of bottom obstacle / bottom canvas
          player.y + player.height < canvas.height))
    ) {
      ctx.font = "25px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Game Over, your score is " + score,
        160,
        canvas.height / 2 - 10
      );
      document.getElementById("button").style.display = "inline-block";
      return true;
    }
  }
}

document.getElementById("button2").onclick = () => {
  document.getElementById("button2").style.display = "none";
  gamespeed = 2;
  player.y = 200;
};

document.getElementById("button").onclick = () => {
  location.reload();
  // document.getElementById("canvas").reload();
  // $("#canvas").load("../index.html #canvas>*", "");
  // $("#canvas").load("/app.js>*");
};
