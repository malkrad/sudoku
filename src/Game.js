import React, { Component } from 'react';
import SudokuBoard from './SudokuBoard';

export class Game extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<header>
					<h1>Sudoku JS</h1>
				</header>
				<SudokuBoard />
			</div>
		);
	}
}

export default Game;
