let key_up=false, key_right=false, key_left=false;
let gravity=2.7;
let player, platforms=[], clock, levers=[], machines=[], clones=[], particles=[], boxes=[], buttons=[];
let state="menu";//"game";
let maxtrans=32;
let tperiod=4;
let score=0;
let whole=true;
let gametime=0;

let stuk1,stuk2,stuk3,zzz,szszsz,szszsz2,pyk;
let music;
let font,fontsize=64;
let menu,choose;

function falls(o) {
  for (let p of boxes) {
    if (!p.solid) {
      continue;
    }
    let PW=o.w/2, PH=o.h/2;
    let W=p.w/2, H=p.h/2;
    if (o.y+PH<=p.y-H && o.y+o.vy+PH>=p.y-H
        && o.x+PW>=p.x-W && o.x-PW<=p.x+W) {
      return p;
    }
  }
  for (let p of platforms) {
    if (!p.solid) {
      continue;
    }
    let PW=o.w/2, PH=o.h/2;
    let W=p.w/2, H=p.h/2;
    if (o.y+PH<=p.y-H && o.y+o.vy+PH>=p.y-H
        && o.x+PW>=p.x-W && o.x-PW<=p.x+W) {
      return p;
    }
  }
  return null
}

function intersect(a,b) {
  let AW=a.w/2, AH=a.h/2;
  let BW=b.w/2, BH=b.h/2;
  if (a.y+AH>=b.y-BH && a.y-AH<=b.y+BH && a.x+AW>=b.x-BW && a.x-AW<=b.x+BW) {
    return true;
  }
  return false;
}

function reverseTime() {
  state="reversal";
  maxtrans = clock.history.length;
  if (maxtrans<45) {
    tperiod=1;
  } else if (maxtrans<90) {
    tperiod=2;
  } else if (maxtrans<120) {
    tperiod=3;
  } else {
    tperiod=4;
  }
  music.rate(4);
  player.floor=false;
}

function restartTime() {
  let posx=player.x;
  let posy=player.y;
  let hist=clock.history;
  reverseTime();
  clearLevel();
  levels[levelID]();
  clock.history = hist;
  player.x = posx;
  player.y = posy;
  for (let i=0; i<12; i++) {
    let si=sin(PI/6*i),co=cos(PI/6*i);
    particles.push(new Particles(clock.x+si*24,clock.y+co*24,2*si,2*co,{r:0,g:255,b:255},true,24));
  }
}

function keyPressed() {
  if (keyCode==UP_ARROW) {
    key_up=true;
  } else if (keyCode==LEFT_ARROW) {
    key_left=true;
  } else if (keyCode==RIGHT_ARROW) {
    key_right=true;
  }
  if (keyCode==ENTER) {
    if (state=="intro") {
      updateIntro();
      return;
    }
    if (clock.history.length>30) {
      restartTime();
      szszsz2.play();
    }
  }
  if (keyCode==ESCAPE) {
    state="menu";
  }
}

function keyReleased() {
  if (keyCode==UP_ARROW) {
    key_up=false;
  } else if (keyCode==LEFT_ARROW) {
    key_left=false;
  } else if (keyCode==RIGHT_ARROW) {
    key_right=false;
  }
}

function mousePressed() {
  if (state=="menu") {
    menu.onClick();
  } else if (state=="choose") {
    choose.onClick();
  }
}

function preload() {
  stuk1 = loadSound("sounds/stuk1.mp3");
  stuk2 = loadSound("sounds/stuk2.mp3");
  stuk3 = loadSound("sounds/stuk3.mp3");
  zzz = loadSound("sounds/zzz.mp3");
  szszsz = loadSound("sounds/szszsz.mp3");
  szszsz2 = loadSound("sounds/szszsz2.mp3");
  music = loadSound("music/music.mp3");
  pyk = loadSound("sounds/pyk.mp3");
  
  font = loadFont("fonts/Raleway-Thin.ttf");
}

function setup() {
  createCanvas(640, 640);
  frameRate(30);
  levels[levelID]();
  music.rate(1);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER,CENTER);
  menu = new Menu();
  choose = new Choose();
  music.loop();
}

function draw() {
  if (state=="menu") {
    menu.show();
    return;
  } else if (state=="choose") {
    choose.show();
    return;
  } else if (state=="intro") {
    showIntro();
    return;
  }
  
  player.update();
  clock.update();
  if (state=="game") {
    for (let l of levers) {
      l.update();
    }
    for (let m of machines) {
      m.update();
    }
    for (let i=0; i<clones.length; i++) {
      if (clones[i].update()) {
        score++;
        clones.splice(i,1);
        i--;
      }
    }
    for (let b of boxes) {
      b.update();
    }
    for (let b of buttons) {
      b.update();
    }
  }
  
  if (clones.length==0 && score==1) {
    if (whole) {
      nextLevel();
    } else {
      state="choose";
    }
  }
  
  stroke(0);
  strokeWeight(1);
  background(200,150,100);
  
  if (state=="reversal") {
    let trans = clock.history.length/maxtrans;
    let transcale=1-0.1*sin(PI*trans*2);
    translate(320,320);
    rotate(sin(TAU*trans)/32);
    translate(-320*transcale,-320*transcale);
    scale(transcale);
    stroke(0,255,0,255*tperiod*trans%255);
    background(tperiod*(255-200)*trans%(255-200)+200, tperiod*(0-150)*trans%(0-150)+150, tperiod*(255-100)*trans%(255-100)+100);
  }
  
  if (whole && levelID==levels.length-1) {
    push();
    fill(0,0,255);
    strokeWeight(1);
    rect(427,427-12-16,32,32);
    textSize(16);
    text("Good job!",427,335+8);
    pop();
  }
 
  for (let i=0; i<platforms.length; i++) {
    platforms[i].show();
  }
  player.showTail();
  for (let b of buttons) {
    b.show();
  }
  for (let b of boxes) {
     b.show();
  }
  for (let l of levers) {
    l.show();
  }
  for (let m of machines) {
    m.show();
  }
  clock.show();
  for (let c of clones) {
    c.show();
  }
  player.show();
  for (let i=0; i<particles.length; i++) {
    if (particles[i].show()) {
      particles.splice(i,1);
      i--;
    }
  }
  
  if (tutorial) {
    showTutorial();
  }
  
  if (whole) {
    if (levelID!=levels.length-1) {
      gametime++;
    } else {
      push();
      fill(0,255,255);
      strokeWeight(2);
      stroke(0);
      textSize(24);
      let seconds = Math.floor(gametime/30*100)/100;
      text("Congratulations!",320,160-32);
      text("You beat the game in "+seconds+" seconds!",320,320-32);
      text("Ludum Dare 44      @suchista",320,480);
      pop()
    }
  }
}