class Lever {
  constructor(x,y,linked,rewind) {
    this.x = x;
    this.y = y-13;
    this.on=false;
    this.linked = linked;
    //this.r=8;
    this.rewind=rewind;
  }
  
  
  
  interact() {
    let PW=player.w/2, PH=player.h/2;
    if (player.x+PW>=this.x && player.x-PW<=this.x
       && player.y+PH>=this.y && player.y-PH<=this.y) {
      if (player.vx>0 && !this.on) {
        this.on=true;
        return true;
      } else if (player.vx<0 && this.on) {
        this.on=false;
        return true;
      }
    }
    return false;
  }
  
  update() {
     if (this.interact()) {
       stuk2.play();
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
    translate(this.x,this.y);
    if (this.rewind) {
      push();
      strokeWeight(6);
      stroke(255,255,0);
      if (this.on) {
        line(0,0,16,-16);
      } else {
        line(0,0,-16,-16);
      }
      pop();
    }
    strokeWeight(4);
    if (this.on) {
      line(0,0,16,-16);
    } else {
      line(0,0,-16,-16);
    }
    pop();
  }
}