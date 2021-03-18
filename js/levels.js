let levels = [tut1,tut2,tut4,tut3,tut5,tut6,level1,level2,ending];
let levelID=0;

function clearLevel() {
  score = 0;
  platforms = [];
  levers = [];
  machines = [];
  clones = [];
  boxes = [];
  buttons = [];
  particles = [];
}

function nextLevel() {
  levelID++;
  if (levelID<levels.length) {
    clearLevel();
    levels[levelID]();
  }
}

function tut1() {
  player = new Player(128,320);
  clock = new Clock(320,213,8*30);
  machines.push(new Machine(320,427));
  platforms.push(new Platform(320,427,639,24,true));
  levers.push(new Lever(512,427,[],true));
}

function tut2() {
  const k=32;
  player = new Player(128,427-12-16+k);
  clock = new Clock(128+24,128+k,6*30);
  machines.push(new Machine(480,427-256+k));
  platforms.push(new Platform(320,427+k,639,24,true));
  platforms.push(new Platform(320,427-128+k,128,24,true));
  platforms.push(new Platform(480,427-256+k,160,24,true));
  levers.push(new Lever(320,427-128+k,[],true));
}

function tut3() {
  const k=0;
  player = new Player(100,512+k);
  clock = new Clock(320,320+k,6*30);
  machines.push(new Machine(320-32+k,180));
  
  platforms.push(new Platform(320,600+k,639,24,true));
  platforms.push(new Platform(320,460+k,160,24,true));
  platforms.push(new Platform(128,320+k,128,24,true));
  platforms.push(new Platform(512,320+k,128,24,false));
  platforms.push(new Platform(320,180+k,128,24,true));
  levers.push(new Lever(320+32,180+k,[platforms[2],platforms[3]],true));
}

function tut4() {
  const k=32;
  player = new Player(128,427-12-16+k);
  clock = new Clock(128+32,128+k,6*30);
  machines.push(new Machine(480-32, 160+k));
  platforms.push(new Platform(320,480+k,639,24,true));
  platforms.push(new Platform(320,320+k,128,24,true));
  platforms.push(new Platform(480,160+k,160,24,true));
  levers.push(new Lever(480+32,160+k,[platforms[1]],true));
  levers.push(new Lever(512,480+k,[platforms[1]],false));
}

function tut5() {
  player = new Player(128,427-12-16);
  clock = new Clock(320,300,8*30);
  machines.push(new Machine(320-24, 160));
  platforms.push(new Platform(160,480,320,24,true));
  platforms.push(new Platform(480,480,319,24,true));
  platforms.push(new Platform(512,290,128,24,true));
  platforms.push(new Platform(128,290,128,24,false));
  platforms.push(new Platform(320,160,160,24,true));
  levers.push(new Lever(320+24+18,160,[platforms[1],platforms[2],platforms[3]],true));
  boxes.push(new Box(360,420));
}

function tut6() {
  player = new Player(128,440);
  clock = new Clock(320,128,10*30);
  machines.push(new Machine(128,250));
  platforms.push(new Platform(320,512,639,24,true));
  platforms.push(new Platform(320,290,128,24,true));
  platforms.push(new Platform(128,250,128,24,false));
  platforms.push(new Platform(512,250,128,24,true));
  platforms.push(new Platform(320,401,64,24,false));
  buttons.push(new Button(512,512,[platforms[1],platforms[2],platforms[4]],false));
  levers.push(new Lever(512,250,[platforms[1],platforms[4]],true));
  boxes.push(new Box(320,290));
}

function level1() {
  player = new Player(128,427-12-16);
  clock = new Clock(320-16,213+64+32+8,12*30);
  platforms.push(new Platform(320,600,639,24,true));
  platforms.push(new Platform(320,480,128,24,true));
  platforms.push(new Platform(540+24,360,92,24,true));
  platforms.push(new Platform(500,240,92,24,true));
  platforms.push(new Platform(92,240,64,24,true));
  platforms.push(new Platform(92,360,64,24,false));
  platforms.push(new Platform(128,480,64,24,false));
  levers.push(new Lever(540+32+24,360,[platforms[1], platforms[5], platforms[6]],true));
  levers.push(new Lever(500-32,240,[platforms[1]],false));
  machines.push(new Machine(92,240));
}

function level2() {
  const k=96;
  player = new Player(128,480-12-16-k);
  clock = new Clock(320,213-k,16*30);
  
  platforms.push(new Platform(128,480-k,180,24,true));
  platforms.push(new Platform(512,480-k,180,24,true));
  platforms.push(new Platform(512,600-k,64,24,true));
  platforms.push(new Platform(128,600-k,64,24,true));
  platforms.push(new Platform(512,360-k,48,24,true));
  platforms.push(new Platform(128,360-k,48,24,true));
  platforms.push(new Platform(320,600-k,48,24,false));
  
  buttons.push(new Button(512,600-k,[platforms[0],platforms[6]],false));
  levers.push(new Lever(512,360-k,[platforms[1]],false));
  levers.push(new Lever(128,360-k,[platforms[0]],false));
  levers.push(new Lever(512-64,480-k,[],true));
  
  machines.push(new Machine(128,600-k));
  
  boxes.push(new Box(512+50,480-k));
}

function ending() {
  platforms.push(new Platform(320,427,639,24,true));
  player = new Player(320,427-12-16);
  clock = new Clock(320,213,12*30);
}