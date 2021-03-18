class MenuButton {
  constructor(x,y,w,h,txt) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
  }
  
  mouseon() {
    return (mouseX>=this.x-this.w/2 && mouseX<=this.x+this.w/2
           && mouseY>=this.y-this.h/2 && mouseY<=this.y+this.h/2);
  }
  
  show(timer) {
    stroke(200,255,145, 255*timer/30);
    fill(200,150,100);
    if (this.mouseon()) {
      let trans = timer/30;
      tperiod=0.5;
      /*fill(tperiod*(255-200)*trans%(255-200)+200, tperiod*(0-150)*trans%(0-150)+150, tperiod*(255-100)*trans%(255-100)+100);*/
      fill(255,0,255);
    }
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    text(this.txt,this.x, this.y-10);
  }
}

class Choose {
  constructor() {
    this.mbuttons =[];
    for (let i=0; i<levels.length-1; i++) {
      this.mbuttons.push(new MenuButton(170+96*(i%4),320-48+96*Math.floor(i/4),64,64,i));
    }
    this.timer=30;
  }
  
  onClick() {
    for (let i=0; i<this.mbuttons.length; i++) {
      if (this.mbuttons[i].mouseon()) {
        levelID=i-1;
        nextLevel();
        state="game";
      }
    }
  }
  
  show() {
    background(0);
    textSize(48);
    strokeWeight(2);
    rectMode(CENTER);
    for (let mb of this.mbuttons) {
      mb.show(this.timer);
    }
    this.timer=(this.timer+29)%30;
  }
}

class Menu {
  constructor() {
    this.start = new MenuButton(320,427-36,160,64,"start");
    this.choose = new MenuButton(320,427+36+8,400,64,"choose level");
    this.timer=30;
  }
  
  onClick() {
    if (this.start.mouseon()) {
      state="intro";
      introid=0;
    } else if (this.choose.mouseon()) {
      whole=false;
      state="choose"
    }
  }
  
  show() {
    //background(200,150,100);
    //background(255,0,255);
    //background(227,75,177);
    background(0);
    
    let hangle = -TAU*this.timer/30-PI/2;
    let mangle = -3*TAU*this.timer/30-PI/2;
    
    push();
    translate(320, 128-8);
    strokeWeight(4);
    fill(0);
    stroke(255);
    ellipse(0,0,64,64);
    point(0,0);
    strokeWeight(2);
    line(0,0,16*cos(hangle), 16*sin(hangle));
    line(0,0,24*cos(mangle), 24*sin(mangle));
    pop();
    
    textSize(fontsize);
    rectMode(CENTER);
    this.start.show(this.timer);
    this.choose.show(this.timer);
    stroke(200,255,145, 255*this.timer/30);
    strokeWeight(2);
    text("TimeForYourSouls",320,217);
    textSize(24);
    text("game by Bartosz Suchanek",320,217+48);
    this.timer=(this.timer-1+30)%30;
  }
}