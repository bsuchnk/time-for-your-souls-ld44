let tutorial=true;

const tuttxt = {
  clock: "Watch out for the time!",
  machine: "Activate the cloning machine!",
  lever: "Pull the lever to reverse time!",
  clone: "Collect your clone's soul!"
}

function showTutorial() {
  textSize(16);
  if (levelID<2) {
    if (clock.maxtime-clock.history.length<60) {
      push();
      fill(0);
      strokeWeight(2);
      stroke(255,0,0);
      textSize(24);
      text(tuttxt.clock, clock.x,clock.y-64);
      pop();
    } else {
      text(tuttxt.clock, clock.x,clock.y-64);
    }
    if (!machines[0].on && !machines[0].used) {
      text(tuttxt.machine, machines[0].x,machines[0].y-64);
    }
    if (machines[0].on) {
      text(tuttxt.lever, levers[0].x,levers[0].y-48);
    }
    if (clones.length>0) {
      text(tuttxt.clone, clones[0].x,clones[0].y-64);
    }
    text("arrow keys: move    enter: restart    esc: menu",320,480);
  } else if (levelID<5) {
    if (clock.maxtime-clock.history.length<60) {
      push();
      fill(0);
      strokeWeight(2);
      stroke(255,0,0);
      textSize(24);
      text(tuttxt.clock, clock.x,clock.y-64);
      pop();
    }
  }
}