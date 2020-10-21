const obstaclesArray = [];

class Obstacle {
  constructor() {
    // this.top = (Math.random() * canvas.height) / 3 + 20;
    // this.bottom = (Math.random() * canvas.height) / 3 + 20;

    this.top = Math.random() * (canvas.height - 150) + 20;
    this.bottom = canvas.height - this.top - 100;

    this.x = canvas.width;
    this.width = 35;
    // this.color = "hsla(" + hue + ",100%, 50%,1)";
    this.color = "red";
    this.counted = false;
  }

  draw() {
    function createObs(x, y, width, height, radius) {
      let bar = new Path2D();
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      bar.moveTo(x, y);
      bar.lineTo(x + width, y);
      bar.arcTo(x + width, y - height, x, y - height, 60);
      bar.arcTo(x, y - height, x, y, 60);
      bar.closePath();
      return bar;
    }

    function createObs2(x, y, width, height, radius) {
      let bar = new Path2D();
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      bar.moveTo(x, y); // create starting point
      bar.lineTo(x + width, y);
      bar.arcTo(x + width, y + height, x, y + height, 60);
      bar.arcTo(x, y + height, x, y, 60);
      bar.closePath();
      return bar;
    }

    ctx.fillStyle = "#150705";
    var bottom = createObs(this.x, canvas.height, this.width, this.bottom, 10);
    var top = createObs2(this.x, 0, this.width, this.top, 10);
    ctx.fill(bottom, "nonzero");
    ctx.fill(top, "nonzero");
  }

  update() {
    this.x -= gamespeed;

    if (!this.counted && this.x < player.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  if (gamespeed != 0) {
    if (frame % 90 === 0) {
      obstaclesArray.unshift(new Obstacle());
    }

    for (let i = 0; i < obstaclesArray.length; i++) {
      obstaclesArray[i].update();
    }

    if (obstaclesArray.length > 20) {
      obstaclesArray.pop(obstaclesArray[0]);
    }
  }
}
