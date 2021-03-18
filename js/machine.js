class Machine {
  constructor(x,y,linked) {
    this.x = x;
    this.y = y-32-12;
    this.on=false;
    this.w=48;
    this.h=64;
    this.used=false;
  }
  
  interact() {
    let PW=player.w/2, PH=player.h/2;
    if (player.x+PW>=this.x && player.x-PW<=this.x
       && player.y+PH>=this.y && player.y-PH<=this.y) {
      this.on=true;
      zzz.play();
    }
  }
  
  update() {
    if (!this.on && !this.used) {
      this.interact();
    }
  }
  
  activate() {
    if (this.on && !this.used) {
      clones.push(new Clone(this.x, this.y));
      this.used=true;
      this.on=false;
    }
  }
  
  show() {
    push();
    translate(this.x,this.y);
    if (this.on) {
      fill(127,255,255);
    } else {
      fill(192,192,192);
    }
    rectMode(CENTER);
    rect(0,0,this.w,this.h);
    if (this.on) {
      fill(255,255,255,192);
      rect(0,0,player.w,player.h);
    }
    fill(255);
    if (this.used) {
      fill(224);
    }
    rect(0,-28,40,4);
    rect(0,-22,40,4);
    
    rect(-15,24,6,6);
    rect(-5,24,8,8);
    rect(5,24,8,8);
    rect(15,24,6,6);
    pop();
  }
}