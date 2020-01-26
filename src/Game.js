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
			focusedCell: undefined
		};
		this.setFocus = this.setFocus.bind(this);
		this.changeCell = this.changeCell.bind(this);
		this.handleNumberDown = this.handleNumberDown.bind(this);
	}

	setFocus(subgrid, cell) {
		this.setState({ focusedCell: [ subgrid, cell ] });
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
			this.checkCell(...this.state.focusedCell);
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
		if (block.filter((x) => x === value).length >= 2) {
			console.log('Doubles in block');
		}
		if (row.filter((x) => x === value).length >= 2) {
			console.log('Doubles in row');
		}
		if (col.filter((x) => x === value).length >= 2) {
			console.log('Doubles in col');
		}
	}

	componentDidMount() {
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
				/>
			</div>
		);
	}
}

export default Game;
