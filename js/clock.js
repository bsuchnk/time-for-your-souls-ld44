class Clock {
  constructor(x,y, maxtime) {
    this.history=[{x: player.x, y: player.y}];
    //this.maxtime= 16*30;//48*30; // probably more, maybe /2
    //yes, /2, no, for sure not more. or maybe just quick 
    this.maxtime = maxtime;
    
    this.x=x;
    this.y=y;
    this.r=64;
    this.hr=16;
    this.mr=24;
  }
  
  update() {
    if (state=="game")
    {
      this.history.push({x: player.x, y: player.y});
      if (this.history.length>this.maxtime) {
        restartTime();
        szszsz2.play();
      }
    }
    
    if (state=="reversal") {
      if (this.history.length>1) {
        this.history.pop();
        if (this.history.length>1) {
          this.history.pop();
        }
      } else {
        player.vx=0;
        player.vy=0;
        state="game";
        for (let m of machines) {
          m.activate();
        }
        music.rate(1);
      }
    }
  }
  
  show() {
    let hangle = TAU*this.history.length/this.maxtime-PI/2;
    let mangle = 15*TAU*this.history.length/this.maxtime-PI/2;
    
    push();
    translate(this.x, this.y);
    strokeWeight(4);
    fill(255);
    ellipse(0,0,this.r,this.r);
    point(0,0);
    strokeWeight(2);
    line(0,0,this.hr*cos(hangle), this.hr*sin(hangle));
    line(0,0,this.mr*cos(mangle), this.mr*sin(mangle));
    pop();
  }
}