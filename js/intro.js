let introid=0;

const introtxt = [
  {t:"Well, well, well, we meet again.",y:false},
  {t:"You remember the deal. You have to give me your soul.",y:false},
  {t:"Can I give you a soul of my clone?",y:true},
  {t:"It's technically the same thing.",y:true},
  {t:"Oh... Yeah, but not really.",y:false},
  {t:"What if I gave you more than one of my souls?",y:true},
  {t:"Ok, I'll take eight.",y:false},
  {t:"That's perfect! I have exactly eight clone machines.",y:true},
  {t:"But those machines work only when time goes backwards!",y:false},
  {t:"Fortunately I can manipulate time.",y:true},
  {t:"Collect one soul a day or I'll come for you!",y:false}
];

function showIntro() {
  push();
  background(200,150,100);
  rectMode(CENTER);
  fill(200,255,145);
  stroke(0);
  strokeWeight(1);
  rect(320,427,639,24);
  fill(255);
  rect(213,427-12-16,32,32);
  fill(0,0,255);
  rect(427,427-12-16,32,32);
  textSize(16);
  if (introtxt[introid].y) {
    text(introtxt[introid].t,213,335+8);
  } else {
    text(introtxt[introid].t,427,335+8);
  }
  text("press enter to continue",320,480);
  pop();
}

function updateIntro() {
  introid++;
  if (introid>=introtxt.length) {
    levelID=-1;
    state="game";
    nextLevel();
    whole=true;
    gametime=0;
  }
}