import React, { Component } from 'react';
import SubGrid from './SubGrid';
import './SudokuBoard.css';

export class SudokuBoard extends Component {
	static defaultProps = {
		subGrids: new Array(9).fill(new Array(9).fill(0))
	};
	render() {
		const subGrids = this.props.subGrids.map((subGrid, idx) => <SubGrid idx={idx} key={idx} cells={subGrid} />);
		return <div className="SudokuBoard">{subGrids}</div>;
	}
}

export default SudokuBoard;
