class Box {
  constructor(x,y) {
    this.x = x;
    this.y = y-16-12;
    this.vx = 0;
    this.vy = 0;
    this.w=32;
    this.h=32;
    this.floor=false;
    this.solid=true;
  }
  
  update() {
    this.floor=false;
    this.vy+=gravity;
    if (this.vx<0) {
      this.vx++;
    } else if (this.vx>0) {
      this.vx--;
    }
    
    let p = falls(this);
    if (p!=null) {
      this.y = p.y-p.h/2-this.h/2;
      if (this.vy>2.7) {
        stuk3.play();
      }
      if (this.vy>=15) {
        particles.push(new Particles(this.x,this.y+this.h/2, this.vx, this.vy,{r:0,g:0,b:55},false,48));
      }
      this.vy=0;
      this.floor=true;
    }
    
    this.x+=this.vx;
    this.y+=this.vy;
    
    let PW=this.w/2, PH=this.h/2;
    let W=player.w/2, H=player.h/2;
    if (this.y+PH>player.y-H && this.y-PH<player.y+H
        && this.x+PW>=player.x-W && this.x-PW<=player.x+W) {
      //console.log("aua");
      if (player.vx>0) {
        this.x = player.x+player.w/2+this.w/2;
        this.vx = player.vx;
      } else if (player.vx<0) {
        this.x = player.x-player.w/2-this.w/2;
        this.vx = player.vx;
      }
    }
  }
  
  show() {
    push();
    translate(this.x,this.y);
    rectMode(CENTER);
    fill(0,0,55);
    stroke(0);
    rect(0,0,this.w,this.h);
    pop();
  }
}