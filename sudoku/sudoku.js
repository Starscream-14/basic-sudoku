var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
  "51---289-",
  "-49--83-7",
  "7--4192--",
  "--8-41-79",
  "1-52-9--3",
  "-94-531--",
  "8--93--25",
  "43---5-68",
  "---86--3-",
];

var solution = [
  "516372894",
  "249568317",
  "783419256",
  "328641579",
  "175289643",
  "694753182",
  "861934725",
  "437125968",
  "952867431",
];

let seconds = 0;
let timerInterval = null;

window.onload = function () {
  setGame();
  startTimer();
};

function setGame() {
  // Digits for 1-9
  for (let i = 1; i <= 9; i++) {
    // <div id="1" class="number">1</div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  // Board Code
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
        this.innerText = numSelected.id;
        checkGameComplete();
    } else {
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
  }
}

function checkGameComplete() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            if (tile.innerText !== solution[r][c]) {
                return;
            }
        }
    }
    stopTimer();
    alert("Congratulations! You have completed the game.");
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(sec) {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById("night-mode-toggle");
    toggle.addEventListener("click", function() {
        document.body.classList.toggle("night-mode");
        if (document.body.classList.contains("night-mode")) {
            toggle.textContent = "☀️ Day Mode";
        } else {
            toggle.textContent = "🌙 Night Mode";
        }
    });
    document.getElementById("auto-solve-btn").addEventListener("click", function() {
        autoSolveSudoku();
    });
    document.getElementById("new-game-btn").addEventListener("click", function() {
        newGame();
    });
});

function newGame() {
    // Reset the timer and errors and start a new game
    errors = 0;
    seconds = 0;
    document.getElementById("errors").innerText = errors;
    document.getElementById("timer").textContent = formatTime(seconds);
    stopTimer();

    // Clear board and digits
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";

    setGame();
    startTimer();
}

function autoSolveSudoku() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            tile.innerText = solution[r][c];
            tile.classList.remove("tile-start");
        }
    }
    stopTimer();
    alert("Congratulations! You have completed the game.");
}

