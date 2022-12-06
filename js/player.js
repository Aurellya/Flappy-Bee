const character = new Image();
character.src = "../img/bee.png";

class Player {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;

    this.originalWidth = 458;
    this.originalHeight = 347;
    this.width = this.originalWidth / 14;
    this.height = this.originalHeight / 14;

    // this.weight = 0.65;
    this.weight = 0.45;
    this.frameX = 0;
  }

  update() {
    // let curve = Math.sin(angle) * 20;
    let curve = Math.sin(angle) * 20;

    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      let temp_vy;
      if (gamespeed != 0) {
        temp_vy = 0.7;
      } else {
        temp_vy = 0.4;
      }

      this.vy += this.weight;
      this.vy *= temp_vy;
      // this.vy *= 0.9;
      this.y += this.vy;
    }

    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed && this.y > this.height * 3) this.fly();

    this.vy += this.weight;
    // this.y += this.vy;
  }

  draw() {
    ctx.fillStyle = "white";

    // for testing
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    let temp;
    if (gamespeed == 0) {
      temp = 150;
    } else {
      temp = 8;
    }

    ctx.drawImage(
      character,
      this.frameX * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 10,
      this.y - temp,
      this.width * 1.4,
      this.height * 1.4
    );
  }

  fly() {
    // this.vy -= 2;
    this.vy -= 1.4;
    if (this.frameX >= 3) this.frameX = 0;
    else if (this.frameX % 3 === 0) this.frameX++;
  }
}

const player = new Player();
