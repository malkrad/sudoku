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
	}

	setFocus(subgrid, cell) {
		if (!this.state.immutable[subgrid][cell]) {
			this.setState({ focusedCell: [ subgrid, cell ] });
		}
	}

	changeCell(subgrid, cell, newNum) {
		let newCells = this.state.cells;
		newCells[subgrid][cell] = newNum;
		this.setState({ cells: newCells });
	}

	handleNumberDown(evt) {
		// Both parseInt and isNan are used to avoid Spacebar Key
		// Since it can't be catched by isNan on its own.
		if (this.state.focusedCell && !isNaN(parseInt(evt.key))) {
			this.changeCell(...this.state.focusedCell, parseInt(evt.key));
			this.checkConflicts(...this.state.focusedCell);
		}
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
		cells.map((s, subIdx) =>
			s.map((c, cellIdx) => {
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
		document.addEventListener('keydown', this.handleNumberDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleNumberDown);
	}

	render() {
		return (
			<div>
				<header>
					<h1>Sudoku JS</h1>
				</header>
				<SudokuBoard
					subgrids={this.state.cells}
					handleClick={this.setFocus}
					focusedCell={this.state.focusedCell}
					wrongCells={this.state.wrongCells}
					causingError={this.state.causingError}
					immutable={this.state.immutable}
				/>
			</div>
		);
	}
}

export default Game;
