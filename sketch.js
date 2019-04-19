let water = []
let ripples = []
// let change = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (j = 20; j < height; j += 20) {
    for (i = 20; i < width; i += 20) {
      water.push(new Particle(i, j))
    }
  }
}

function draw() {
  background(100);

  for (i = 0; i < water.length; i++) {

    if (ripples.length > 0) {
      for (j = 0; j < ripples.length; j++) {
      ripples[j].update();
      water[i].applyForce(ripples[j]);
      }
      if(ripples[0].d>width){
         ripples.shift()
         }
    }
    water[i].applyTension();
    water[i].update();
    water[i].render();
  }

  // console.log(change.length)
}

function mousePressed() {
    ripples.push(new Ripple(mouseX, mouseY));
  // ripples[0] = new Ripple(mouseX, mouseY);
}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.amp = 0;
    this.v = 0
    this.a = 0
    this.m = 10;
    this.c = color(255, 100);
  }
  /*
  applyForce(force) {
    //f = ma
    let f = p5.Vector.div(force, this.m);
    this.a.add(f);
  }

    update() {
      this.v = this.v.add(this.a);
      this.pos = this.pos.add(this.v);
      this.a.mult(0);
    }
  */

  applyForce(r) {

    // if (dist(r.x, r.y, this.pos.x, this.pos.y) - r.d > 0 && dist(r.x, r.y, this.pos.x, this.pos.y) - r.d < r.l) {
    if (dist(r.x, r.y, this.pos.x, this.pos.y) - r.d >0 &&dist(r.x, r.y, this.pos.x, this.pos.y) - r.d < 25) {
      this.a = -1.2
    } else {
      this.a = 0
    }
  }

  applyTension() {
    this.a = this.a + (this.amp * -0.05) + (this.v * -0.06)
  }

  update() {
    // console.log(this.a)
    this.v = this.v + this.a
    this.amp = this.amp + this.v;
    this.a = 0;
  }

  render() {
    this.c.setAlpha(100 + this.amp * 20);
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }

  edge() {
    if (this.pos.x > width - 5) {
      this.pos.x = width - 5;
      this.v.x *= -1;
    } else if (this.pos.x < 5) {
      this.v.x *= -1;
      this.pos.x = 5;
    }
    if (this.pos.y > height - 5) {
      this.v.y *= -1;
      this.pos.y = height - 5;
    }
  }
}

class Ripple {
  constructor(mX, mY) {
    this.x = mX
    this.y = mY
    this.t = 0
    this.v = 1 / 150
    this.l = 30
    this.d = 0
  }
  update() {
    this.t++
    this.d = this.t * this.v

  }
}
