const particlesArray = [];

class Particle {
  constructor() {
    this.x = player.x;
    this.y = player.y + 20;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "hsla(37, 95%, 68%, " + hueOp + ")";
  }

  update() {
    this.x -= gamespeed + 2;
    this.y += this.speedY;
  }

  draw() {
    if (gamespeed != 0) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function handleParticles() {
  particlesArray.unshift(new Particle());
  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}
