let score = 0;

let board = [
  //c0,c1,c2,c3
  [0, 0, 0, 0], //r0
  [0, 0, 0, 0], //r1
  [0, 0, 0, 0], //r2
  [0, 0, 0, 0], //r3
];

window.onload = () => {
  setGame();
};

function setGame() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let num = board[r][c];
      const tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.textContent = board[r][c];
      tile.classList.add("tile");
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        return true;
      }
    }
  }
}

function setTwo() {
  if (!hasEmptyTile()) {
    alert("You lost!");
    return;
  }
  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * 4);
    let c = Math.floor(Math.random() * 4);
    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  if (num === 2048) {
    alert("You win!!!");
  }
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    tile.classList.add("x" + num.toString());
  }
}

document.addEventListener("keyup", (e) => keyPressed(e));

function keyPressed(e) {
  if (e.code === "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code === "ArrowDown") {
    slideDown();
    setTwo();
  } else if (e.code === "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code === "ArrowRight") {
    slideRight();
    setTwo();
  }
}

function slideLeft() {
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < 4; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < 4; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < 4; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < 4; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < 4; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < 4; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slide(row) {
  row = filterZeros(row); //get rid 0
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      document.getElementById("score").innerText = score;
      i;
    }
  }

  row = filterZeros(row);
  while (row.length < 4) {
    row.push(0);
  }
  return row;
}

function filterZeros(row) {
  return row.filter((num) => num !== 0);
}
