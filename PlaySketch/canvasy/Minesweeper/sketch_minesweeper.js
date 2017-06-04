var grid;
var cols;
var rows;
var w = 40;
var totalBees = 40;
var gameOver = true;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function setup() {
  gameOver = false;
  createCanvas(641, 641);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  // Vybranie miest pre totalBees
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      options.push([i, j]);
    }
  }
  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.slice(index, 1);
    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].countBees();
    }
  }
}

function draw() {
  textSize(w/2);
  strokeWeight(2);
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
  if(gameOver){
  }
}

function Over() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  stop();
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if (grid[i][j].bee) {
          Over();
          gameOver = true;
        }
      }
    }
  }
}

function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    gamePaused = true;
  } else if (gamePaused) {
    game = setTimeout(gameLoop, 1000 / 30);
    gamePaused = false;
  }
}
