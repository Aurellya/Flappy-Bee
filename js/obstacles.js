const obstaclesArray = [];

class Obstacle {
  constructor() {
    // this.top = (Math.random() * canvas.height) / 3 + 20;
    // this.bottom = (Math.random() * canvas.height) / 3 + 20;

    this.top = Math.random() * (canvas.height - 150) + 20;
    this.bottom = canvas.height - this.top - 110;

    this.x = canvas.width;
    this.width = 35;
    // this.color = "hsla(" + hue + ",100%, 50%,1)";
    this.color = "#150705";
    this.counted = false;
  }

  drawFirst() {
    function createFirstObs(x, y, width, height, radius) {
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

    function createFirstObs2(x, y, width, height, radius) {
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

    ctx.fillStyle = this.color;
    let bottom = createFirstObs(
      this.x,
      canvas.height,
      this.width,
      this.bottom,
      10
    );
    let top = createFirstObs2(this.x, 0, this.width, this.top, 10);
    ctx.fill(bottom, "nonzero");
    ctx.fill(top, "nonzero");
  }

  draw() {
    function createObs(x, y, width, height, radius) {
      let bar = new Path2D();
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      bar.moveTo(x, y);
      bar.lineTo(x + width, y);
      bar.arcTo(x + width, y - height, x, y - height, radius);
      bar.arcTo(x, y - height, x, y, radius);
      bar.closePath();
      return bar;
    }

    function createObs2(x, y, width, height, radius) {
      let bar = new Path2D();
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      bar.moveTo(x, y);
      bar.lineTo(x + width, y);
      bar.arcTo(x + width, y + height, x, y + height, radius);
      bar.arcTo(x, y + height, x, y, radius);
      bar.closePath();
      return bar;
    }

    ctx.fillStyle = this.color;
    let bottom = createObs(this.x, canvas.height, this.width, this.bottom, 10);
    let top = createObs2(this.x, 0, this.width, this.top, 10);
    ctx.fill(bottom, "nonzero");
    ctx.fill(top, "nonzero");
  }

  update() {
    this.x -= gamespeed;

    if (!this.counted && this.x < player.x) {
      score++;
      this.counted = true;
    }

    this.drawFirst();
  }

  update2() {
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
      obst++;
    }

    for (let i = 0; i < obstaclesArray.length; i++) {
      if (i == obstaclesArray.length - 1 && obstaclesArray.length != 0) {
        if (obst == 1) {
          obstaclesArray[i].update2();
        } else {
          obstaclesArray[i].update();
        }
      } else {
        obstaclesArray[i].update2();
      }
    }

    if (obstaclesArray.length > 20) {
      obstaclesArray.pop(obstaclesArray[0]);
    }
  }
}
