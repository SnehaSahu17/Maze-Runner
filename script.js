//Difficulty Levels
let level1 = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
];

let level2 = [
  [1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 1],
];

let level3 = [
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
];

//by default level1
let mazearray = level1;
let Level = document.getElementById("levelselect");
Level.addEventListener("change", function () {
  let level = Level.value;
  //console.log(level);
  if (level == 1) {
    mazearray = level1;
  }
  if (level == 2) {
    mazearray = level2;
  }
  if (level == 3) {
    mazearray = level3;
  }
  maze.innerHTML = `<img src="./run.png" alt="runner" id ="runner" width="50px" height="50px"/>
    <img src="./home.png" alt="home" id ="home" width="50px" height="50px"/>`;
  createMaze();
});

let maze = document.getElementById("maze-container");
let runner = document.getElementById("runner");
let home = document.getElementById("home");

//function to move runner
function setrunnerposition(x, y) {
  runner.style.top = x + "px";
  runner.style.left = y + "px";
}
function sethomeposition(x, y) {
  home.style.bottom = x + "px";
  home.style.right = y = "px";
}

//created maze
function createMaze() {
  for (let i = 0; i < mazearray.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < mazearray[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      if (mazearray[i][j] == 0) cell.classList.add("wall");

      if ((i == 0) & (j == 0)) mazearray[i][j] = 2;

      row.appendChild(cell);
    }
    maze.appendChild(row);
  }
  //set runner and home to default positions
  setrunnerposition(0, 0);
  sethomeposition(0, 0);
  
}

//get runner position i.e. one set to 2
function getrunnerposition() {
    // find 2 in mazearray and return its position
    let position = [-1, -1];
    for (let i = 0; i < mazearray.length; i++) {
        for (let j = 0; j < mazearray[i].length; j++) {
            if (mazearray[i][j] == 2) {
                position[0] = i;
                position[1] = j;
            }
        }
    }
    console.log(position);
    return position;
}
//set key's functionality
 document.addEventListener("keydown", function(e) {
    let runner= document.getElementById("runner");
    let home = document.getElementById("home");
    let  runnerleft= runner.offsetLeft;
    let runnertop = runner.offsetTop;
    let homeleft = home.offsetLeft;
    let hometop = home.offsetTop;
    let runnerposition = getrunnerposition();
 
    if (e.key == "ArrowRight" && runnerleft < (mazearray.length - 1) * 50 && mazearray[runnerposition[0]][runnerposition[1] + 1] == 1) {
        runnerleft += 50;
        runner.style.left = runnerleft + "px";
        mazearray[runnerposition[0]][runnerposition[1]] = 1;
        mazearray[runnerposition[0]][runnerposition[1] + 1] = 2;
    }


    if (e.key == "ArrowLeft" && runnerleft > 0 && mazearray[runnerposition[0]][runnerposition[1] - 1] == 1) {
        runnerleft -= 50;
        runner.style.left = runnerleft + "px";
        mazearray[runnerposition[0]][runnerposition[1]] = 1;
        mazearray[runnerposition[0]][runnerposition[1] - 1] = 2;
    }

    if (e.key == "ArrowUp" && runnertop > 0 && mazearray[runnerposition[0] - 1][runnerposition[1]] == 1) {
        runnertop -= 50;
        runner.style.top = runnertop + "px";
        mazearray[runnerposition[0]][runnerposition[1]] = 1;
        mazearray[runnerposition[0] - 1][runnerposition[1]] = 2;
    }


    if (e.key == "ArrowDown" && runnertop < (mazearray.length - 1) * 50 && mazearray[runnerposition[0] + 1][runnerposition[1]] == 1) {
        runnertop += 50;
        runner.style.top = runnertop + "px";
        mazearray[runnerposition[0]][runnerposition[1]] = 1;
        mazearray[runnerposition[0] + 1][runnerposition[1]] = 2;
    }


    if (runnerleft == homeleft && runnertop == hometop) {
        let win = document.getElementById('winner');
        win.innerHTML=`Congratulations! You Won`;
    }
 })
