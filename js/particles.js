const maxplife=30;

class Particle {
  constructor(x,y,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  
  update() {
    this.x+=this.vx;
    this.y+=this.vy;
  }
  
  show() {
    push();
    translate(this.x,this.y);
    //stroke(0,255,0,127);
    strokeWeight(1);
    //noStroke();
    ellipse(0,0,5,5);
    pop();
  }
}

class Particles {
  constructor(x,y,vx,vy,c,straight,hmany) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i=0; i<hmany; i++) {
      if (straight) {
        this.particles.push(new     Particle(this.x,this.y,random(-1,1)+vx,random(-1,1)+vy));
      } else {
        this.particles.push(new     Particle(this.x,this.y,random(-1,1)+vx*0.07,random(-1,1)+vy*0.03));
      }
    }
    this.life=maxplife;
    this.c=c;
  }
  
  show() {
    //noStroke();
    stroke(200,255,145, 255*this.life/maxplife);
    //fill(255,255,255, 255*this.life/maxplife);
    fill(this.c.r,this.c.g,this.c.b, 255*this.life/maxplife);
    for (let p of this.particles) {
      p.update();
      p.show();
    }
    stroke(0);
    this.life--;
    return this.life<=0;
  }
}