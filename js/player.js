const character = new Image();
character.src = "../img/bee.png";

class Player {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;

    this.originalWidth = 458;
    this.originalHeight = 347;
    this.width = this.originalWidth / 20;
    this.height = this.originalHeight / 20;

    this.weight = 0.65;
    this.frameX = 0;
  }

  update() {
    let curve = Math.sin(angle) * 20;

    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height + -this.height * 3 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }

    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed && this.y > this.height * 3) this.fly();

    this.vy += this.weight;
    this.y += this.vy;
  }

  draw() {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height); for testing
    ctx.drawImage(
      character,
      this.frameX * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 17,
      this.y - 10,
      this.width * 1.8,
      this.height * 1.8
    );
  }

  fly() {
    this.vy -= 2;
    if (this.frameX >= 3) this.frameX = 0;
    else if (this.frameX % 3 === 0) this.frameX++;
  }
}

const player = new Player();
