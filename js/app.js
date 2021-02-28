const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restart");
const playText = document.getElementById("headline");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;
let count = 0;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--magenta);`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--magenta);`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--magenta);`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid var(--magenta);`;
    }
    box.style = styleString;

    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    count ++;
    if (hasPlayerWon(currentPlayer)) {
      playText.innerHTML = `${currentPlayer} wins!!`;
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    if(count ===9){
        playText.innerHTML = `Draw!!`;
    }
  }
}

const hasPlayerWon = (player) => {
  
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} wins up top`);
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} wins on the left`);
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
  
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
    if (spaces[4] === player && spaces[0] === player) {
        console.log(`${player} wins on the diagonal`);
        return true;
      }
  }
 
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
    if (spaces[0] === player && spaces[8] === player) {
        console.log(`${player} wins on the diagonal`);
        return true;
      }
      if (spaces[2] === player && spaces[6] === player) {
        console.log(`${player} wins on the diagonal`);
        return true;
      }
  }
};

restartBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.innerHTML = `Let's Play!!`;

  currentPlayer = O_TEXT;
});

drawBoard();
