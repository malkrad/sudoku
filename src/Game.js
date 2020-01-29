import React, { Component } from 'react';
import SudokuBoard from './SudokuBoard';

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [
				[ 2, 6, 0, 0, 0, 0, 0, 0, 0 ],
				[ 5, 0, 0, 0, 0, 1, 0, 0, 0 ],
				[ 0, 1, 0, 8, 0, 0, 4, 2, 0 ],
				[ 0, 9, 4, 0, 3, 0, 0, 0, 6 ],
				[ 1, 0, 0, 8, 4, 0, 0, 0, 0 ],
				[ 0, 0, 0, 2, 5, 0, 0, 0, 0 ],
				[ 0, 0, 0, 3, 0, 2, 0, 0, 5 ],
				[ 7, 0, 0, 0, 0, 8, 0, 0, 6 ],
				[ 0, 0, 8, 0, 0, 0, 0, 0, 0 ]
			],
			immutable: new Array(9).fill(new Array(9).fill(false)),
			wrongCells: new Array(9).fill(new Array(9).fill(false)),
			causingError: new Array(9).fill(new Array(9).fill(false)),
			focusedCell: undefined
		};
		this.setFocus = this.setFocus.bind(this);
		this.changeCell = this.changeCell.bind(this);
		this.handleNumberDown = this.handleNumberDown.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.help = this.help.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	setFocus(subgrid, cell) {
		if (!this.state.immutable[subgrid][cell]) {
			this.setState({ focusedCell: [ subgrid, cell ] });
		}
	}

	changeCell(value, subgrid, cell) {
		if (!this.state.immutable[subgrid][cell]) {
			let newCells = this.state.cells;
			newCells[subgrid][cell] = value;
			this.setState({ cells: newCells });
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

	getBlock(subgrid) {
		return this.state.cells[subgrid];
	}

	getRow(subgrid, cell) {
		const subgridPos = Math.floor(subgrid / 3) * 3;
		const subgrids = this.state.cells.slice(subgridPos, subgridPos + 3);
		const cellPos = Math.floor(cell / 3) * 3;
		const cells = subgrids.map((s) => s.slice(cellPos, cellPos + 3));
		return [].concat(...cells);
	}

	getCol(subgrid, cell) {
		const subgrids = this.state.cells.filter((_, idx) => idx % 3 === subgrid % 3);
		const cells = subgrids.map((s) => s.filter((_, idx) => idx % 3 === cell % 3));
		return [].concat(...cells);
	}

	checkCell(subgrid, cell) {
		const value = this.state.cells[subgrid][cell];
		const block = this.getBlock(subgrid);
		const row = this.getRow(subgrid, cell);
		const col = this.getCol(subgrid, cell);
		let toColor = { block: false, row: false, col: false };
		if (block.filter((x) => x === value).length >= 2) {
			toColor.block = true;
		}
		if (row.filter((x) => x === value).length >= 2) {
			toColor.row = true;
		}
		if (col.filter((x) => x === value).length >= 2) {
			toColor.col = true;
		}
		return [ toColor.block || toColor.row || toColor.col, toColor ];
	}

	findWrongCells(value, subgrid, cell, toColor, wrongCells, causingError) {
		if (toColor.block) {
			wrongCells[subgrid] = new Array(9).fill(true);
			causingError[subgrid] = causingError[subgrid].map(
				(cellValue, idx) => (this.state.cells[subgrid][idx] === value ? true : cellValue)
			);
		}
		if (toColor.row) {
			wrongCells = wrongCells.map(
				(s, idx) =>
					Math.floor(idx / 3) === Math.floor(subgrid / 3)
						? wrongCells[idx].map(
								(cellValue, idx) => (Math.floor(idx / 3) === Math.floor(cell / 3) ? true : cellValue)
							)
						: s
			);
			causingError = causingError.map(
				(s, subIdx) =>
					Math.floor(subIdx / 3) === Math.floor(subgrid / 3)
						? causingError[subIdx].map(
								(cellValue, cellIdx) =>
									Math.floor(cellIdx / 3) === Math.floor(cell / 3) &&
									this.state.cells[subIdx][cellIdx] === value
										? true
										: cellValue
							)
						: s
			);
		}
		if (toColor.col) {
			wrongCells = wrongCells.map(
				(s, idx) =>
					idx % 3 === subgrid % 3
						? wrongCells[idx].map((cellValue, idx) => (idx % 3 === cell % 3 ? true : cellValue))
						: s
			);
			causingError = causingError.map(
				(s, subIdx) =>
					subIdx % 3 === subgrid % 3
						? causingError[subIdx].map(
								(cellValue, cellIdx) =>
									cellIdx % 3 === cell % 3 && this.state.cells[subIdx][cellIdx] === value
										? true
										: cellValue
							)
						: s
			);
		}
		return [ wrongCells, causingError ];
	}

	checkConflicts() {
		let { cells } = this.state;
		let wrongCells = new Array(9).fill(new Array(9).fill(false));
		let causingError = new Array(9).fill(new Array(9).fill(false));
		cells.forEach((s, subIdx) =>
			s.forEach((c, cellIdx) => {
				if (c !== 0) {
					const [ status, toColor ] = this.checkCell(subIdx, cellIdx);
					if (status) {
						[ wrongCells, causingError ] = this.findWrongCells(
							c,
							subIdx,
							cellIdx,
							toColor,
							wrongCells,
							causingError
						);
					}
				}
			})
		);
		this.setState({ wrongCells: wrongCells, causingError: causingError });
	}

	componentDidMount() {
		this.setState({
			immutable: this.state.immutable.map((s, subIdx) =>
				s.map((c, cellIdx) => (this.state.cells[subIdx][cellIdx] ? true : false))
			)
		});
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	clearBoard() {
		this.setState({
			cells: this.state.cells.map((s, subIdx) =>
				s.map((c, cellIdx) => (this.state.immutable[subIdx][cellIdx] ? c : 0))
			),
			wrongCells: new Array(9).fill(new Array(9).fill(false)),
			causingError: new Array(9).fill(new Array(9).fill(false))
		});
	}

	solveForOne(subgrid, cell) {
		let solutions = new Array(9).fill(0).map((_, idx) => idx + 1);
		const block = this.getBlock(subgrid);
		const row = this.getRow(subgrid, cell);
		const col = this.getCol(subgrid, cell);
		solutions = solutions.filter((c) => !block.includes(c) && !row.includes(c) && !col.includes(c));
		return solutions;
	}

	help() {
		const { cells, immutable } = this.state;
		let directSolution = cells.map((s, subIdx) =>
			s.map((c, cellIdx) => (!immutable[subIdx][cellIdx] ? this.solveForOne(subIdx, cellIdx) : []))
		);
		let toSolve = { subgrid: undefined, cell: undefined, value: undefined };
		for (let subgrid = 0; subgrid < directSolution.length; subgrid++) {
			for (let cell = 0; cell < directSolution[subgrid].length; cell++) {
				if (directSolution[subgrid][cell].length === 1) {
					toSolve.subgrid = subgrid;
					toSolve.cell = cell;
					toSolve.value = directSolution[subgrid][cell][0];
				}
			}
		}
		if (toSolve.value) {
			this.changeCell(toSolve.value, toSolve.subgrid, toSolve.cell);
			this.checkConflicts();
		} else {
			alert('No direct solutions');
		}
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
				/>
				<div className="HelperButtonsContainer">
					<button className="HelperButton" onClick={this.clearBoard}>
						Clear
					</button>
					<button className="HelperButton" onClick={this.help}>
						Help
					</button>
				</div>
			</div>
		);
	}
}

export default Game;
