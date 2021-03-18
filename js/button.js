const maxbuttonh = 18;

class Button {
  constructor(x,y,linked,rewind) {
    this.x = x;
    this.y = y-12;
    this.on=false;
    this.linked = linked;
    this.rewind=rewind;
    this.w=36;
    this.h=18;
  }
  
  interact() {
    this.h = maxbuttonh;
    if (intersect(this,player)) {
      this.h=this.y-player.y-player.h/2+4;
      return true;
    }
    for (let b of boxes) {
      if (intersect(this,b)) {
        this.h=this.y-b.y-b.h/2+4;
        return true;
      }
    }
    return false;
  }
  
  update() {
    let inter = this.interact();
    if (this.on!=inter) {
      this.on=inter;
      for (let p of this.linked) {
        p.solid = !p.solid;
      }
      if (this.rewind) {
        reverseTime();
      }
    }
  }
  
  show() {
    push();
    translate(this.x,this.y-this.h/2);
    rectMode(CENTER);
    fill(255,255,0);
    if (this.rewind) {
      push();
      strokeWeight(2);
      stroke(255,255,0);
      fill(0);
      rect(0,0,this.w,this.h);
      pop();
    } else {
      rect(0,0,this.w,this.h);
    }
    pop();
  }
}