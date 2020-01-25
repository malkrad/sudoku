import React, { Component } from 'react';
import SudokuBoard from './SudokuBoard';

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [[2, 6, 0, 0, 0, 0, 0, 0, 0],
			[5, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 1, 0, 8, 0, 0, 4, 2, 0],
			[0, 9, 4, 0, 3, 0, 0, 0, 6],
			[1, 0, 0, 8, 4, 0, 0, 0, 0],
			[0, 0, 0, 2, 5, 0, 0, 0, 0],
			[0, 0, 0, 3, 0, 2, 0, 0, 5],
			[7, 0, 0, 0, 0, 8, 0, 0, 6],
			[0, 0, 8, 0, 0, 0, 0, 0, 0]],
			focusedCell: undefined
		}
		this.setFocus = this.setFocus.bind(this);
		this.changeCell = this.changeCell.bind(this);
		this.handleNumberDown = this.handleNumberDown.bind(this);
	}

	setFocus(subgrid, cell) {
		this.setState({ focusedCell: [subgrid, cell] })
	}

	changeCell(newNum) {
		const [x, y] = this.state.focusedCell;
		let newCells = this.state.cells;
		newCells[x][y] = newNum
		this.setState({ cells: newCells })
	}

	handleNumberDown(evt) {
		// Both parseInt and isNan are used to avoid Spacebar Key
		// Since it can't be catched by isNan on its own.
		if (this.state.focusedCell && !isNaN(parseInt(evt.key))) this.changeCell(parseInt(evt.key));
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleNumberDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleNumberDown);
	}

	render() {
		return (
			<div>
				<header>
					<h1>Sudoku JS</h1>
				</header>
				<SudokuBoard subgrids={this.state.cells} handleClick={this.setFocus} />
			</div>
		);
	}
}

export default Game;
