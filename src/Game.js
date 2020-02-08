import React, { Component } from 'react';
import SudokuBoard from './SudokuBoard';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: new Array(9).fill(new Array(9).fill(0)),
      hints: new Array(9).fill(new Array(9).fill(false)),
      immutable: new Array(9).fill(new Array(9).fill(false)),
      wrongCells: new Array(9).fill(new Array(9).fill(false)),
      causingError: new Array(9).fill(new Array(9).fill(false)),
      focusedCell: undefined,
      solved: false
    };
    this.setFocus = this.setFocus.bind(this);
    this.changeCell = this.changeCell.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.hint = this.hint.bind(this);
    this.solve = this.solve.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setFocus(subgrid, cell) {
    if (!this.state.immutable[subgrid][cell]) {
      this.setState({ focusedCell: [ subgrid, cell ] });
    }
  }

  handleKeyDown(evt) {
    // Both parseInt and isNan are used to avoid Spacebar Key
    // Since it can't be catched by isNan on its own.
    const key = evt.key;
    const arrows = [ 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown' ];
    if (this.state.focusedCell && !isNaN(parseInt(key))) {
      this.handleNumberDown(parseInt(evt.key));
    } else if (arrows.includes(key)) {
      this.handleArrowDown(key);
    }
  }

  handleNumberDown(value) {
    // Both parseInt and isNan are used to avoid Spacebar Key
    // Since it can't be catched by isNan on its own.
    this.changeCell(value, ...this.state.focusedCell);
    this.checkConflicts(...this.state.focusedCell);
    this.checkSolved();
  }

  changeCell(value, subgrid, cell) {
    if (!this.state.immutable[subgrid][cell]) {
      let newCells = this.state.cells;
      newCells[subgrid][cell] = value;
      this.setState({ cells: newCells });
    }
  }

  checkConflicts() {
    let { cells } = this.state;
    let wrongCells = new Array(9).fill(new Array(9).fill(false));
    let causingError = new Array(9).fill(new Array(9).fill(false));
    cells.forEach((subgrid, subIdx) =>
      subgrid.forEach((cell, cellIdx) => {
        if (cell !== 0) {
          const [ status, toCheck ] = this.checkCell(subIdx, cellIdx);
          if (status) {
            [ wrongCells, causingError ] = this.findWrongCells(
              cell,
              subIdx,
              cellIdx,
              toCheck,
              wrongCells,
              causingError
            );
          }
        }
      })
    );
    this.setState({ wrongCells: wrongCells, causingError: causingError });
  }

  checkSolved() {
    const { cells, wrongCells } = this.state;
    let solved = true;
    for (let subgrid = 0; subgrid < cells.length; subgrid++) {
      for (let cell = 0; cell < cells[subgrid].length; cell++) {
        if (!cells[subgrid][cell] || wrongCells[subgrid][cell]) {
          solved = false;
          break;
        }
        if (!solved) break;
      }
    }
    this.setState({ solved: solved });
  }

  handleArrowDown(arrow) {
    let subgrid, cell;
    if (this.state.focusedCell) {
      [ subgrid, cell ] = this.state.focusedCell;
      switch (arrow) {
        case 'ArrowLeft':
          [ subgrid, cell ] = this.moveLeft(subgrid, cell);
          break;
        case 'ArrowRight':
          [ subgrid, cell ] = this.moveRight(subgrid, cell);
          break;
        case 'ArrowUp':
          [ subgrid, cell ] = this.moveUp(subgrid, cell);
          break;
        case 'ArrowDown':
          [ subgrid, cell ] = this.moveDown(subgrid, cell);
          break;
        default:
      }
    } else {
      [ subgrid, cell ] = [ 0, 0 ];
    }
    this.setState({ focusedCell: [ subgrid, cell ] });
  }

  moveLeft(subgrid, cell) {
    if (cell % 3 !== 0) {
      cell--;
    } else if (subgrid % 3 !== 0) {
      cell += 2;
      subgrid--;
    }
    return [ subgrid, cell ];
  }

  moveRight(subgrid, cell) {
    if (cell % 3 !== 2) {
      cell++;
    } else if (subgrid % 3 !== 2) {
      cell -= 2;
      subgrid++;
    }
    return [ subgrid, cell ];
  }

  moveUp(subgrid, cell) {
    if (Math.floor(cell / 3) !== 0) {
      cell -= 3;
    } else if (Math.floor(subgrid / 3) !== 0) {
      cell += 6;
      subgrid -= 3;
    }
    return [ subgrid, cell ];
  }

  moveDown(subgrid, cell) {
    if (Math.floor(cell / 3) !== 2) {
      cell += 3;
    } else if (Math.floor(subgrid / 3) !== 2) {
      cell -= 6;
      subgrid += 3;
    }
    return [ subgrid, cell ];
  }

  checkCell(subgrid, cell) {
    const value = this.state.cells[subgrid][cell];
    const block = this.getBlock(subgrid, this.state.cells);
    const row = this.getRow(subgrid, cell, this.state.cells);
    const col = this.getCol(subgrid, cell, this.state.cells);
    let wrongs = { block: false, row: false, col: false };
    if (block.filter((x) => x === value).length >= 2) {
      wrongs.block = true;
    }
    if (row.filter((x) => x === value).length >= 2) {
      wrongs.row = true;
    }
    if (col.filter((x) => x === value).length >= 2) {
      wrongs.col = true;
    }
    return [ wrongs.block || wrongs.row || wrongs.col, wrongs ];
  }

  getBlock(subgrid, cells) {
    return cells[subgrid];
  }

  getRow(subgrid, cell, cells) {
    const subgridPos = Math.floor(subgrid / 3) * 3;
    const subgrids = cells.slice(subgridPos, subgridPos + 3);
    const cellPos = Math.floor(cell / 3) * 3;
    const row = subgrids.map((s) => s.slice(cellPos, cellPos + 3));
    return [].concat(...row);
  }

  getCol(subgrid, cell, cells) {
    const subgrids = cells.filter((_, idx) => idx % 3 === subgrid % 3);
    const col = subgrids.map((s) => s.filter((_, idx) => idx % 3 === cell % 3));
    return [].concat(...col);
  }

  findWrongCells(value, subgrid, cell, toCheck, wrongCells, causingError) {
    if (toCheck.block) {
      [ wrongCells, causingError ] = this.findWrongCellsInBlock(value, subgrid, wrongCells, causingError);
    }
    if (toCheck.row) {
      [ wrongCells, causingError ] = this.findWrongCellsInRow(value, subgrid, cell, wrongCells, causingError);
    }
    if (toCheck.col) {
      [ wrongCells, causingError ] = this.findWrongCellsInCol(value, subgrid, cell, wrongCells, causingError);
    }
    return [ wrongCells, causingError ];
  }

  findWrongCellsInBlock(value, subgrid, wrongCells, causingError) {
    wrongCells[subgrid] = new Array(9).fill(true);
    causingError[subgrid] = causingError[subgrid].map(
      (cellValue, idx) => (this.state.cells[subgrid][idx] === value ? true : cellValue)
    );
    return [ wrongCells, causingError ];
  }

  findWrongCellsInRow(value, subgrid, cell, wrongCells, causingError) {
    wrongCells = wrongCells.map(
      (s, idx) =>
        Math.floor(idx / 3) === Math.floor(subgrid / 3)
          ? wrongCells[idx].map((cellValue, idx) => (Math.floor(idx / 3) === Math.floor(cell / 3) ? true : cellValue))
          : s
    );
    causingError = causingError.map(
      (s, subIdx) =>
        Math.floor(subIdx / 3) === Math.floor(subgrid / 3)
          ? causingError[subIdx].map(
              (cellValue, cellIdx) =>
                Math.floor(cellIdx / 3) === Math.floor(cell / 3) && this.state.cells[subIdx][cellIdx] === value
                  ? true
                  : cellValue
            )
          : s
    );
    return [ wrongCells, causingError ];
  }

  findWrongCellsInCol(value, subgrid, cell, wrongCells, causingError) {
    wrongCells = wrongCells.map(
      (s, idx) =>
        idx % 3 === subgrid % 3 ? wrongCells[idx].map((cellValue, idx) => (idx % 3 === cell % 3 ? true : cellValue)) : s
    );
    causingError = causingError.map(
      (s, subIdx) =>
        subIdx % 3 === subgrid % 3
          ? causingError[subIdx].map(
              (cellValue, cellIdx) =>
                cellIdx % 3 === cell % 3 && this.state.cells[subIdx][cellIdx] === value ? true : cellValue
            )
          : s
    );
    return [ wrongCells, causingError ];
  }

  clearBoard() {
    this.setState({
      cells: this.state.cells.map((s, subIdx) =>
        s.map((c, cellIdx) => (this.state.immutable[subIdx][cellIdx] ? c : 0))
      ),
      wrongCells: new Array(9).fill(new Array(9).fill(false)),
      causingError: new Array(9).fill(new Array(9).fill(false)),
      solved: false
    });
  }

  solve() {
    const originalCells = this.state.cells.map((subgrid, subIdx) =>
      subgrid.map((cell, cellIdx) => (this.state.immutable[subIdx][cellIdx] ? cell : 0))
    );
    const { result, cells } = this.solveNext(originalCells, false);
    if (result) {
      this.setState({
        solved: true,
        cells: cells,
        wrongCells: new Array(9).fill(new Array(9).fill(false)),
        causingError: new Array(9).fill(new Array(9).fill(false))
      });
    } else alert('Sorry, but something went wrong!');
  }

  solveNext(cells, shuffle) {
    const nextEmptyCell = this.nextEmptyCell(cells);
    if (!nextEmptyCell) return { result: true, cells: cells };
    let [ subgrid, cell ] = nextEmptyCell;
    let solutions = this.cellSolutions(subgrid, cell, cells);
    if (!solutions.length) {
      return { result: false, cells: cells };
    }
    // since shuffling costs a lot of time,
    // it should be used only in making puzzles
    // but not in solving them
    solutions = shuffle ? this.shuffle(solutions) : solutions;
    for (const solution of solutions) {
      cells[subgrid][cell] = solution;
      if (this.solveNext(cells).result) return { result: true, cells: cells };
      cells[subgrid][cell] = 0;
    }
    return { result: false, cells: cells };
  }

  nextEmptyCell(cells) {
    for (let subgrid = 0; subgrid < cells.length; subgrid++) {
      for (let cell = 0; cell < cells[0].length; cell++) {
        if (cells[subgrid][cell] === 0) return [ subgrid, cell ];
      }
    }

    return null;
  }

  cellSolutions(subgrid, cell, cells) {
    let solutions = new Array(9).fill(0).map((_, idx) => idx + 1);
    const block = this.getBlock(subgrid, cells);
    const row = this.getRow(subgrid, cell, cells);
    const col = this.getCol(subgrid, cell, cells);
    solutions = solutions.filter((c) => !block.includes(c) && !row.includes(c) && !col.includes(c));
    return solutions;
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
    }
    return arr;
  }

  makeBoard() {
    let emptyBoard = Array.from({ length: 9 }).map(() => Array(9).fill(0));
    let { result, cells } = this.solveAndShuffle(emptyBoard);
    if (result) {
      let shuffledKeys = this.shuffle([ ...Array(81).keys() ]);
      for (let key of shuffledKeys) {
        const subgrid = Math.floor(key / 9);
        const cell = key % 9;
        const cellValue = cells[subgrid][cell];
        cells[subgrid][cell] = 0;
        const solutions = this.cellSolutions(subgrid, cell, cells);
        if (solutions.length !== 1 && solutions.length !== 2) {
          cells[subgrid][cell] = cellValue;
        }
      }
      const immutable = this.immutableCells(cells);
      this.setState({
        cells: cells,
        immutable: immutable,
        wrongCells: new Array(9).fill(new Array(9).fill(false)),
        causingError: new Array(9).fill(new Array(9).fill(false)),
        solved: false
      });
    } else {
      alert('Something wrong happend while trying to make a board!');
    }
  }

  solveAndShuffle(cells) {
    return this.solveNext(cells, true);
  }

  immutableCells(cells) {
    return cells.map((subgrid, subIdx) => subgrid.map((cell, cellIdx) => (cell ? true : false)));
  }

  hint() {
    const [ foundLonelyCells, lonelyCells ] = this.findLonelyCells();
    const [ foundLonelyValues, lonelyValues ] = this.findLonelyValues();
    let hints = new Array(9).fill(new Array(9).fill(false));
    hints = hints.map((subgrid, subIdx) =>
      subgrid.map((cell, cellIdx) => lonelyCells[subIdx][cellIdx] || lonelyValues[subIdx][cellIdx])
    );
    if (foundLonelyCells || foundLonelyValues) {
      this.setState({ hints: hints });
    } else {
      alert('No direct solutions');
    }
  }

  // Cells that can only fit one value
  // according to the current values of the grid
  findLonelyCells() {
    const { cells, immutable, hints } = this.state;
    let hintsFound = false;
    let solution = cells.map((subgrid, subIdx) =>
      subgrid.map((cell, cellIdx) => (!immutable[subIdx][cellIdx] ? this.cellSolutions(subIdx, cellIdx, cells) : []))
    );
    for (let subgrid = 0; subgrid < solution.length; subgrid++) {
      for (let cell = 0; cell < solution[subgrid].length; cell++) {
        if (solution[subgrid][cell].length === 1) {
          hints[subgrid][cell] = true;
          hintsFound = true;
        }
      }
    }
    return [ hintsFound, hints ];
  }

  // Values that can be fit in one place in a block, row or col
  // according to the current values of the grid
  findLonelyValues() {
    const { cells, immutable, hints } = this.state;
    let hintsFound = false;
    let solution = cells.map((subgrid, subIdx) =>
      subgrid.map((cell, cellIdx) => (!immutable[subIdx][cellIdx] ? this.cellSolutions(subIdx, cellIdx, cells) : []))
    );
    let countedSolutions = new Array(9).fill(new Array(9).fill(0));
    solution.forEach((subgrid, subIdx) => subgrid.forEach((cell, cellIdx) => (countedSolutions[subIdx][cell] += 1)));
    // TODO: find lonely values logic
    return [ hintsFound, hints ];
  }

  componentDidMount() {
    this.makeBoard();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div>
        <header>
          <h1 id="title">Sudoku JS</h1>
        </header>
        <SudokuBoard
          subgrids={this.state.cells}
          handleClick={this.setFocus}
          focusedCell={this.state.focusedCell}
          wrongCells={this.state.wrongCells}
          causingError={this.state.causingError}
          immutable={this.state.immutable}
          hints={this.state.hints}
          solved={this.state.solved}
        />
        <div className="HelperButtonsContainer">
          <button className="HelperButton" onClick={this.makeBoard}>
            New
          </button>
          <button className="HelperButton" onClick={this.clearBoard}>
            Clear
          </button>
          {/* <button className="HelperButton" onClick={this.hint}>
						Hint
					</button> */}
          <button className="HelperButton" onClick={this.solve}>
            Solve!
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
