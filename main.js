const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');

const previewSave = document.querySelector('#savePiece');
const contextSave = previewSave.getContext('2d');

const score = document.querySelector('#score');
const BLOCK_SIZE = 20;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

previewSave.width = BLOCK_SIZE * 4;
previewSave.height = BLOCK_SIZE * 4;

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const PIECES = [
  [
    [1, 1],
    [1, 1],
  ],
  [[2, 2, 2, 2]],
  [
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    [0, 4],
    [0, 4],
    [4, 4],
  ],
  [
    [5, 0],
    [5, 0],
    [5, 5],
  ],
  [
    [6, 6, 0],
    [0, 6, 6],
  ],
  [
    [0, 7, 7],
    [7, 7, 0],
  ],
];

const piece = {
  position: { x: 5, y: 5 },
  shape: PIECES[Math.floor(Math.random() * PIECES.length)],
};
const savePiece = {
  shape: [],
};
const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FF6200',
];
const colorsStroke = [
  '#E00000',
  '#00E000',
  '#0000E0',
  '#E0E000',
  '#E000E0',
  '#00E0E0',
  '#E05600',
];

context.scale(BLOCK_SIZE, BLOCK_SIZE);
contextSave.scale(BLOCK_SIZE, BLOCK_SIZE);

let speedTime = 1500;
let dropCounter = 0;
let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (puntaje > 500) speedTime = 1000;
  if (puntaje > 1000) speedTime = 700;
  if (puntaje > 1500) speedTime = 500;
  if (puntaje > 1700) speedTime = 300;
  if (puntaje > 2000) speedTime = 100;
  if (puntaje > 2500) speedTime = 50;
  if (dropCounter > speedTime) {
    dropCounter = 0;
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  contextSave.fillStyle = '#0000';
  contextSave.fillRect(0, 0, previewSave.width, previewSave.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1 && value <= 7) {
        context.fillStyle = colors[value - 1];
        context.fillRect(x, y, 1, 1);
        context.strokeStyle = colorsStroke[value - 1];
        context.lineWidth = 0.1;
        context.strokeRect(x + 0.1, y + 0.1, 0.8, 0.8);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1 && value <= 7) {
        context.fillStyle = colors[value - 1];
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
        context.strokeStyle = colorsStroke[value - 1];
        context.lineWidth = 0.1;
        context.strokeRect(
          x + piece.position.x + 0.1,
          y + piece.position.y + 0.1,
          0.8,
          0.8
        );
      }
    });
  });

  savePiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1 && value <= 7) {
        contextSave.fillStyle = colors[value - 1];
        contextSave.fillRect(x, y, 1, 1);
        contextSave.strokeStyle = colorsStroke[value - 1];
        contextSave.lineWidth = 0.1;
        contextSave.strokeRect(x + 0.1, y + 0.1, 0.8, 0.8);
      }
    });
  });
}

document.addEventListener('keydown', (event) => {
  const tecla = event.key.toLowerCase();
  if (tecla === 'a') {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }
  if (tecla === 'd') {
    piece.position.x++;

    if (checkCollision()) {
      piece.position.x--;
    }
  }
  if (tecla === 's') {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }
  if (tecla === 'k') {
    const rotated = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
  if (tecla === 'j') {
    const rotated = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.unshift(piece.shape[j][i]);
      }
      rotated.unshift(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
  if (tecla === 'h') {
    changePiece();
  }
});
let changePiecePermisso = true;

function changePiece() {
  if (changePiecePermisso) {
    if (!savePiece.shape[0]) {
      savePiece.shape = piece.shape;
      piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
      piece.position.x = Math.floor((Math.random() * BOARD_WIDTH) / 2);
      piece.position.y = 0;
    } else {
      const shapeTemporal = savePiece.shape;
      savePiece.shape = piece.shape;
      piece.shape = shapeTemporal;
      piece.position.x = Math.floor((Math.random() * BOARD_WIDTH) / 2);
      piece.position.y = 0;
    }
    previewSave.height = BLOCK_SIZE * savePiece.shape.length;
    previewSave.width = BLOCK_SIZE * savePiece.shape[0].length;
    contextSave.scale(BLOCK_SIZE, BLOCK_SIZE);
    changePiecePermisso = false;
  }
}
function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1 && value <= 7) {
        board[y + piece.position.y][x + piece.position.x] = value;
      }
    });
  });
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
  piece.position.x = Math.floor((Math.random() * BOARD_WIDTH) / 2);
  piece.position.y = 0;
  changePiecePermisso = true;
  if (checkCollision()) {
    piece.position.y = 0;
    previewSave.height = 0;
    previewSave.width = 0;
    window.alert('perdiste xd');
    board.forEach((row) => row.fill(0));
  }
}
let puntaje = 0;
function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value >= 1 && value <= 7)) {
      rowsToRemove.push(y);
      puntaje += 100;

      score.innerHTML = puntaje;
    }
  });
  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
  });
}

function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}
update();
