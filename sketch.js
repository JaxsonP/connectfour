let turn = 0;// 0 == yellow | 1 == red
let holeGrid = [];
let vert = false, hori = false,
    backDiag = false, frontDiag = false;
let winCondition = [];
let winner;
let gameOver = false;

let mouseColumn;
let mouseColumnOld;
let mouseOnGame;

const confettiDensity = 1;
const confettiSize = 8;
const confettiSpeed = 4;
const confettiSpeedVar = 1.5;
const confettiDriftVar = 2;
let confettiArray = [];
let bounceSpeed = 8;
let bounceY = 0;
let time;

function setup() {

  frameRate(30);
  noLoop();
  let cnv = createCanvas(360, 350);

  for (let i = 0; i < 7; i++) {

    holeGrid[i] = [];
    for (let j = 0; j < 6; j++) {

      holeGrid[i][j] = new hole (i, j);
    }
  }

  time = 0;

  redraw();
  print("Setup complete");
}

function draw() {

  background(255);
  noStroke();
  time++;
  bounceY = sin(time / bounceSpeed) * 50;

  if (gameOver) { loop(); } else { noLoop();}

  fill(0, 100, 255);
  rect(0, 25, 360, 310, 15);

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {

      holeGrid[i][j].display();
    }
  }

  noFill();
  stroke(20);
  strokeWeight(5);
  if (winCondition[0]) {//vert

    arc((winner.x * 50) + 30, (winner.y * 50) + 55, 50, 50, 0, PI);
    arc((winner.x * 50) + 30, ((winner.y - 3) * 50) + 55, 50, 50, PI, 0);
    line((winner.x * 50) + 5, (winner.y * 50) + 55, (winner.x * 50) + 5, ((winner.y - 3) * 50) + 55);
    line((winner.x * 50) + 55, (winner.y * 50) + 55, (winner.x * 50) + 55, ((winner.y - 3) * 50) + 55);

  }
  if (winCondition[1]) {//hori

    arc((winner.x * 50) + 30, (winner.y * 50) + 55, 50, 50, PI / 2, PI * 1.5);
    arc(((winner.x + 3) * 50) + 30, (winner.y * 50) + 55, 50, 50, PI * 1.5, PI / 2);
    line((winner.x * 50) + 30, (winner.y * 50) + 30, ((winner.x + 3) * 50) + 30, (winner.y * 50) + 30);
    line((winner.x * 50) + 30, (winner.y * 50) + 80, ((winner.x + 3) * 50) + 30, (winner.y * 50) + 80);
  }
  if (winCondition[2]) {//frontDiag

    arc((winner.x * 50) + 30, (winner.y * 50) + 55, 50, 50, PI / 4, PI / 4 + PI);
    arc(((winner.x + 3) * 50) + 30, ((winner.y - 3) * 50) + 55, 50, 50, PI / 4 + PI, PI / 4);
    line((winner.x * 50) + 12.322, (winner.y * 50) + 37.322, ((winner.x + 3) * 50) + 12.322, ((winner.y - 3) * 50) + 37.322);
    line((winner.x * 50) + 47.678, (winner.y * 50) + 72.678, ((winner.x + 3) * 50) + 47.678, ((winner.y - 3) * 50) + 72.678);
  }
  if (winCondition[3]) {//backDiag

    arc((winner.x * 50) + 30, (winner.y * 50) + 55, 50, 50, PI / 4 + HALF_PI, PI / 4 + PI + HALF_PI);
    arc(((winner.x + 3) * 50) + 30, ((winner.y + 3) * 50) + 55, 50, 50, PI / 4 - HALF_PI, PI / 4 + HALF_PI);
    line((winner.x * 50) + 47.678, (winner.y * 50) + 37.322, ((winner.x + 3) * 50) + 47.678, ((winner.y + 3) * 50) + 37.322);
    line((winner.x * 50) + 12.322, (winner.y * 50) + 72.678, ((winner.x + 3) * 50) + 12.322, ((winner.y + 3) * 50) + 72.678);
  }

  if (mouseOnGame && !gameOver) {

    noFill();
    if (turn == 0) {

      stroke(220, 220, 0);
    } if (turn == 1) {

      stroke(220, 0, 0);
    }
    strokeWeight(5);
    rect((mouseColumn * 50)+ 5, 25, 50, 310, 15);
  }

  if (gameOver) {
    for (let i = 0; i < confettiDensity; i++) {

      let newConf = new confetti();
      confettiArray.push(newConf);
      newConf.index = confettiArray.length;
    }

    for (let i = 0; i < confettiArray.length; i++) {

      confettiArray[i].update();
    }

    stroke(0);
    strokeWeight(5);
    if (turn == 0) {

      fill(220, 0, 0);
    } else {

      fill(220, 220, 0);
    }
    rect((width / 2) - 100, bounceY + 100, 200, 50, 15);

    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    textSize(28);
    if (turn == 0) {

      text("Red Wins!", width / 2, bounceY + 125);
    } else {

      text("Yellow Wins!", width / 2, bounceY + 125);
    }
  }
}

class hole {

  constructor (x, y) {

     this.x = x;
     this.y = y;
     this.xPos = this.x * 50;
     this.yPos = this.y * 50;
     this.val = 2;// 0 == yellow | 1 == red | 2 == blank

     print ("New cell created at " + x + " : " + y);
  }

  display () {

    noStroke();
    if (this.val == 0) {

      fill(220, 220, 0);
    } else if (this.val == 1) {

      fill(220, 0, 0);
    } else {

      fill(0, 80, 235);
    }

    ellipse((this.x * 50) + 30, (this.y * 50) + 55, 40, 40);

    if (this.val == 0) {

      fill(200, 200, 0);
      ellipse((this.x * 50) + 30, (this.y * 50) + 55, 30, 30);
    } else if (this.val == 1) {

      fill(200, 0, 0);
      ellipse((this.x * 50) + 30, (this.y * 50) + 55, 30, 30);
    }
  }
}

function checkForWin () {

  if (!vert && !hori && !backDiag && !frontDiag) {

    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {

        let temp = false;

        if (y > 2 && holeGrid[x][y].val != 2) {// vertical

          for (let i = 0; i < 4; i++) {

            temp = 4;
            if (holeGrid[x][y - i].val != turn) {

              temp = false;
              break;
            }
          }
        }
        if (temp) {

          vert = true;
        } else {

          vert = false;
        }

        temp = false;
        if (y > 2 && x < 4 && holeGrid[x][y].val != 2) {// front Diagonal

          temp = true;
          for (let i = 0; i < 4; i++) {

            if (holeGrid[x + i][y - i].val != turn) {

              temp = false;
              break;
            }
          }
        }
        if (temp) {

          frontDiag = true;
        } else {

          frontDiag = false;
        }

        temp = false;
        if (x < 4 && holeGrid[x][y].val != 2) {// horizontal

          temp = true;
          for (let i = 0; i < 4; i++) {

            if (holeGrid[x + i][y].val != turn) {

              temp = false;
              break;
            }
          }
        }
        if (temp) {

          hori = true;
        } else {

          hori = false;
        }

        temp = false;
        if (x < 4 && y < 3  && holeGrid[x][y].val != 2) {// back Diagonal

          temp = true;
          for (let i = 0; i < 4; i++) {

            if (holeGrid[x + i][y + i].val != turn) {

              temp = false;
              break;
            }
          }
        }
        if (temp) {

          backDiag = true;
        } else {

          backDiag = false;
        }

        if (vert || hori || frontDiag || backDiag) {

          print("Winning move! @ " + x + " : " + y);
          winCondition = [vert, hori, frontDiag, backDiag];
          winner = holeGrid[x][y];
          gameOver = true;
        }
      }
    }
  }
}

class confetti {

  constructor () {

    this.x = random(0, width);
    this.y = -10;
    this.varX = random(-confettiDriftVar, confettiDriftVar);
    this.speed = random(confettiSpeed - confettiSpeedVar, confettiSpeed + confettiSpeedVar);
    this.index;

    this.x1 = random(0, confettiSize);
    this.y1 = random(0, confettiSize);
    this.x2 = random(-confettiSize, 0);
    this.y2 = random(0, confettiSize);
    this.x3 = random(-confettiSize, 0);
    this.y3 = random(-confettiSize, 0);
    this.x4 = random(0, confettiSize);
    this.y4 = random(-confettiSize, 0);

    this.r = random(150, 250);
    this.g = random(150, 250);
    this.b = random(150, 250);
  }

  update () {

    noStroke();
    fill(this.r, this.g, this.b);
    quad(this.x + this.x1, this.y + this.y1, this.x + this.x2, this.y + this.y2, this.x + this.x3, this.y + this.y3, this.x + this.x4, this.y + this.y4);

    this.y += this.speed;
    this.x += this.varX;
  }
}

function mousePressed () {

  if (mouseOnGame && !vert && !hori && !backDiag && !frontDiag && !gameOver) {

    let x = mouseColumn;

    for (let i = 0; i < 6; i++) {

      if (holeGrid[x][i].val == 0 || holeGrid[x][i].val == 1) {

        if (i == 0) {
          break;
        }

        holeGrid[x][i - 1].val = turn;
        checkForWin();
        if (turn == 0) { turn = 1; } else { turn = 0; }
        break;

      } else if (i == 5) {

        holeGrid[x][i].val = turn;
        checkForWin();
        if (turn == 0) { turn = 1; } else { turn = 0; }
        break;
      }
    }
  }

  redraw();
}

function mouseMoved () {

  mouseColumnOld = mouseColumn;
  mouseColumn = floor(mouseX / 50);
  if (mouseX < 0 || mouseX > 350 || mouseY < 0 || mouseY > 325) {

    mouseOnGame = false;
  } else { mouseOnGame = true; }

  if (mouseColumn != mouseColumnOld && mouseOnGame && !gameOver) {
    redraw();
  }
}
