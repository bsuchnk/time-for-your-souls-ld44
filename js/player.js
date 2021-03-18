class Player {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.w=32;
    this.h=32;
    this.floor=false;
    this.tail=[];
  }
  
  keys() {
    if (key_up && this.floor) {
      this.vy=-32;
      pyk.play();
    }
    if (key_left) {
      this.vx=max(this.vx-1, -12);
    }
    if (key_right) {
      this.vx=min(this.vx+1, 12);
    }
    if (!key_left && !key_right) {
      if (this.vx<0) {
        this.vx++;
      } else if (this.vx>0) {
        this.vx--;
      }
    }
  }
  
  updateGame() {
    this.keys();
    
    this.floor=false;
    this.vy+=gravity;
    
    let p = falls(this);
    if (p!=null) {
      this.y = p.y-p.h/2-this.h/2;
        
      if (this.vy>2.7) {
        stuk1.play();
      }
      
      if (this.vy>5.4) {
        particles.push(new Particles(this.x,this.y+this.h/2, this.vx, this.vy,{r:255,g:255,b:255},false,32));
      }
        
      this.vy=0;
      this.floor=true;
    }
    
    this.tail.push({x: this.x, y: this.y, r: 32});
    
    this.x+=this.vx;
    this.y+=this.vy;
    
    if (this.x+this.w/2>639) {
      this.x=639-this.w/2;
      this.vx=0;
    } else if (this.x-this.w/2<0) {
      this.x=this.w/2;
      this.vx=0;
    }
  }
  
  updateReversal() {
    this.tail.push({x: this.x, y: this.y, r: 32});
    this.x = clock.history[clock.history.length-1].x;
    this.y = clock.history[clock.history.length-1].y;
  }
  
  update() {
    switch(state) {
      case "game":
        this.updateGame();
        break;
      case "reversal":
        this.updateReversal();
        break;
    }
  }
  
  showTail() {
    push();
    noStroke();
    if (state=="game") {
      fill(255,255,255);
    } else if (state=="reversal") {
      fill(220,255,255);
    }
    for (let t of this.tail) {
      ellipse(t.x, t.y, t.r, t.r);
      t.r*=0.96;
    }
    if (this.tail.length>0 && this.tail[0].r<5) {
      this.tail.shift();
    }
    pop();
  }
  
  show() {
    push();
    translate(this.x,this.y);
    rectMode(CENTER);
    fill(255);
    rect(0,0,this.w,this.h);
    pop();
  }
}