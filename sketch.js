let snake;
let rez = 10;
let food, bigFood;
let w, h;
let score = 0;
let upBtn, downbtn, rightBtn, leftBtn, restartBtn, secretBtn;
let label = "";
let smallFoodCount=0;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-container");
  frameRate(60);
  w = width / rez;
  h = height / rez;
  print(w, h);

  document.documentElement.style.setProperty('--w', w + 'px');
  document.documentElement.style.setProperty('--h', h + 'px');

  snake = new Snake();
  foodLocation();

  secretBtn = createButton(" ");
  let col2 = color(53, 62, 28);
  secretBtn.style("background-color", col2);
  secretBtn.position(w * 6, h * 6.45);
  secretBtn.parent("canvas-container");

  upBtn = select("#up");
  upBtn.mousePressed(() => {
      print("button pressed up");
      snake.setDir(0, -1);
  });

  downBtn = select("#down");
  downBtn.mousePressed(() => {
      print("button pressed down");
      snake.setDir(0, 1);
  });

  leftBtn = select("#left");
  leftBtn.mousePressed(() => {
      print("button pressed left");
      snake.setDir(-1, 0);
  });

  rightBtn = select("#right");
  rightBtn.mousePressed(() => {
      print("button pressed right");
      snake.setDir(1, 0);
  });

  restartBtn=select('#restart');

  pauseBtn = select("#pause");
  pauseBtn.mousePressed(() => {
    if (isLooping()) {
        noLoop();
    } else {
        loop();
    }
  });
}

function foodLocation( ) {
  let x = floor(random(1, w * 0.99 / rez)) * rez;
  let y = floor(random(1, h * 0.643 / rez)) * rez;
  food = createVector(x, y);

  bigFood=createVector(10000,10000)
  
  if (smallFoodCount >= 4) {
    x = floor(random(1, w * 0.99 / rez)) * rez;
    y = floor(random(1, h * 0.643 / rez)) * rez;
    bigFood = createVector(x, y);
    smallFoodCount = 0;
  }
}

function keyPressed() {
  console.log("key is pressed");

  if (keyCode == LEFT_ARROW || key == "a") {
    print("left");
    snake.setDir(-1, 0);
  }

  if (keyCode == RIGHT_ARROW || key == "d") {
    print("right");
    snake.setDir(1, 0);
  }

  if (keyCode == UP_ARROW || key == "w") {
    print("up");
    snake.setDir(0, -1);
  }

  if (keyCode == DOWN_ARROW || key == "s") {
    print("down");
    snake.setDir(0, 1);
  }

  if (key == "g") {
    print("grow");
    score += 1;
    foodLocation();
    snake.grow();
  }

  if (key == "r") {
    score = 0;
    background(41,42,34);
    textSize(2);
    fill(235,238,238);
    label = "score";
    text(label + score,w-10 ,2 );
    foodLocation();
    fill(235,238,238)
    rect(food.x ,food.y ,1 ,1 ,1 );
    snake.setDir(0 ,0 );
    snake.restartGame();
    snake.show();
    snake.update();
    print('restart pressed');
    loop();
  }
  
  if (key == "p" || key==" ") {
    if (isLooping()) {
        noLoop();
    } else {
        loop();
    }
  }
}

function draw() {
  scale(rez);
  background(41, 42, 34);
  textSize(2);
  fill(235, 238, 238);
  text("score: " + score, w - 10, 3);

  let result = snake.eat(food, bigFood);
  if (result.eaten) {
    if (result.big) {
      score += 5;
      smallFoodCount = 0;
      foodLocation(true);
    } else {
      score += 1;
      smallFoodCount += 1;
      foodLocation(false);
    }
  }

  secretBtn.mousePressed(() => {
      snake.grow();
      foodLocation();
      score += 1;
  });

  snake.show();
  snake.update();

  if (snake.gameEnd()) {
    background(31, 32, 24);
    textSize(2.5);
    fill(255, 255, 255);
    label = "Game over. Your final score is: ";
    text(label + score, w / 2 - textWidth(label + score) / 2, h / 3);
    noLoop();
}

  restartBtn.mousePressed(() => {
      score = 0;
      background(41, 42, 34);
      textSize(2);
      fill(235, 238, 238);
      label = "score";
      text(label + score, w - 10, 3);
      foodLocation();
      fill(235, 238, 238)
      rect(food.x ,food.y ,1 ,1 ,1 );
      snake.setDir(0 ,0 );
      snake.restartGame();
      snake.show();
      snake.update();
      print('restart pressed');
      loop();
  });

  fill(235, 238, 238);
  rect(food.x ,food.y ,1.1 ,1.1 ,1 );

  fill(255, 0, 0);
  rect(bigFood.x ,bigFood.y ,1.5 ,1.5 ,1 );
}
