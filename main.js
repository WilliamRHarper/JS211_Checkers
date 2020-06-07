'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



class Checker {
  constructor(color) {
  if (color === 'white'){
    this.symbol = String.fromCharCode(0x125CF)
  } else{
    this.symbol = String.fromCharCode(0x125CB)
      }
    }
  }

class Board {
  constructor() {
    this.grid = []
    this.checkers = []
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
  //make a create checker method
  createCheckers() {
  //start with 2 variable for white and black checkers
  let whiteCheckers = [[0, 1], [0, 3], [0, 5], [0, 7],
  [1, 0], [1, 2], [1, 4], [1, 6],
  [2, 1], [2, 3], [2, 5], [2, 7]];
  let blackCheckers = [[5, 0], [5, 2], [5, 4], [5, 6],
  [6, 1], [6, 3], [6, 5], [6, 7],
  [7, 0], [7, 2], [7, 4], [7, 6]];
  //iterate over the array of arrays
  for (let i = 0; i < 12; i++){
  //use checker template to create white checkers
  let whiteChecker = new Checker('white');
  //create rows and columns for white
  const whiteRow = whiteCheckers[i][0];
  const whiteColumn = whiteCheckers[i][1];
  //use checker template to create black checkers
  let blackChecker = new Checker('black');
  //create rows and columns for black
  const blackRow = blackCheckers[i][0];
  const blackColumn = blackCheckers[i][1];
  //put them on the grid
  this.grid[whiteRow][whiteColumn] = whiteChecker;
  this.grid[blackRow][blackColumn] = blackChecker;
  //push checkers into the checker array
  this.checkers.push(whiteChecker, blackChecker);
  }
  }

}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
  //create a moveChecker method with the inputs as parameters
  moveChecker(whichPiece, toWhere) {
    //change parameters from a strings into arrays
    whichPiece = whichPiece.split("");
    whichPiece[0] = parseInt(whichPiece[0]);
    whichPiece[1] = parseInt(whichPiece[1]);
    toWhere = toWhere.split("");
    toWhere[0] = parseInt(toWhere[0]);
    toWhere[1] = parseInt(toWhere[1]);
    //if input = legal diagonal move for black
    if (toWhere[0] === whichPiece[0] -1 && toWhere[1] === whichPiece[1] - 1 && this.board.grid[toWhere[0]][toWhere[1]] === null || toWhere[0] === whichPiece[0] -1 && toWhere[1] === whichPiece[1] + 1 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CB)){
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]);
    }
    //if input = legal diagonal move for white
    else if (toWhere[0] === whichPiece[0] + 1 && toWhere[1] === whichPiece[1] - 1 && this.board.grid[toWhere[0]][toWhere[1]] === null || toWhere[0] === whichPiece[0] + 1 && toWhere[1] === whichPiece[1] + 1 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CF)){
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]); 
    }
    //if input = legal left diagonal jump for white
    else if (toWhere[0] === whichPiece[0] + 2 && toWhere[1] === whichPiece[1] - 2 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0] + 1][whichPiece[1] - 1].symbol === String.fromCharCode(0x125CB) && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CF)){
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]);
      //replace jumped piece with null
      this.board.grid[whichPiece[0] + 1].splice(whichPiece[1] - 1, 1, null);
      this.board.checkers.pop(); 
    }
    //if input = legal right diagonal jump for white
    else if (toWhere[0] === whichPiece[0] + 2 && toWhere[1] === whichPiece[1] + 2 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0] + 1][whichPiece[1] + 1].symbol === String.fromCharCode(0x125CB) && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CF)) {
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]);
      //replace jumped piece with null
      this.board.grid[whichPiece[0] + 1].splice(whichPiece[1] + 1, 1, null);
      this.board.checkers.pop(); 
    }
    //if input = legal left diagonal jump for black
    else if (toWhere[0] === whichPiece[0] - 2 && toWhere[1] === whichPiece[1] - 2 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0] - 1][whichPiece[1] - 1].symbol === String.fromCharCode(0x125CF) && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CB)) {
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]);
      //replace jumped piece with null
      this.board.grid[whichPiece[0] - 1].splice(whichPiece[1] - 1, 1, null);
      this.board.checkers.pop(); 
    }
    //if input = legal right diagonal jump for black
    else if (toWhere[0] === whichPiece[0] - 2 && toWhere[1] === whichPiece[1] + 2 && this.board.grid[toWhere[0]][toWhere[1]] === null && this.board.grid[whichPiece[0] - 1][whichPiece[1] + 1].symbol === String.fromCharCode(0x125CF) && this.board.grid[whichPiece[0]][whichPiece[1]].symbol === String.fromCharCode(0x125CB)) {
      //make a piece we're working with and replace it with null
      const movingPiece = this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null);
      //replace the piece to where its going
      this.board.grid[toWhere[0]].splice(toWhere[1], 1, movingPiece[0]);
      //replace jumped piece with null
      this.board.grid[whichPiece[0] - 1].splice(whichPiece[1] + 1, 1, null);
      this.board.checkers.pop(); 
    }else{
      console.log("illegal move");
    }

  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();

// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
