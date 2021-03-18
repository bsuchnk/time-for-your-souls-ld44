class Platform {
  constructor(x,y,w,h,solid) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.solid=solid;
  }
  
  show() {
    push();
    translate(this.x, this.y);
    if (this.solid) {
      fill(200,255,145);
    } else {
      noFill();
      strokeWeight(2);
      stroke(0,255,255);
    }
    rectMode(CENTER);
    rect(0,0,this.w,this.h);
    pop();
  }
}