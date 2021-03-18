const maxdead=10;

class Clone {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.w=32;
    this.h=32;
    this.floor=false;
    this.dead=-1;
  }
  
  update() {
    if (this.dead>0) {
      this.dead--;
      this.y-=3;
      this.w-=2;
      this.h+=2;
      if (this.dead==0) {
        return true;
      }
      return false;
    }
    
    this.floor=false;
    this.vy+=gravity;
    
    for (let p of platforms) {
      if (!p.solid) {
        continue;
      }
      let PW=this.w/2, PH=this.h/2;
      let W=p.w/2, H=p.h/2;
      if (this.y+PH<=p.y-H && this.y+this.vy+PH>=p.y-H
         && this.x+PW>=p.x-W && this.x-PW<=p.x+W) {
        
        if (this.vy>2.7) {
          stuk1.play();
        }
        if (this.vy>5.4) {
          particles.push(new Particles(this.x,this.y+this.h/2, this.vx,   this.vy,{r:255,g:255,b:255},false,32));
        }
        
        this.vy=0;
        this.y = p.y-H-PH;
        this.floor=true;
      }
    }
    
    let PW=this.w/2, PH=this.h/2;
    let W=player.w/2, H=player.h/2;
    if (this.y+PH>=player.y-H && this.y+PH<=player.y+H
      && this.x+PW>=player.x-W && this.x-PW<=player.x+W) {
      szszsz.play();
      this.dead=maxdead;
    }
    
    this.x+=this.vx;
    this.y+=this.vy;
    return false;
  }
  
  show() {
    push();
    translate(this.x,this.y);
    rectMode(CENTER);
    if (this.dead==-1) {
      fill(255);
      stroke(0);
    } else {
      fill(255,255,255,255*this.dead/maxdead);
      stroke(0,0,0, 255*this.dead/maxdead);
    }
    rect(0,0,this.w,this.h);
    pop();
  }
}