import React, { Component } from 'react';
import './Subgrid.css';
import Cell from './Cell';

export class SubGrid extends Component {
	static defaultProps = {
		cells: new Array(9).fill(0)
	};

	constructor(props) {
		super(props);
		this.cellClicked = this.cellClicked.bind(this);
	}

	cellClicked(cell) {
		this.props.handleClick(this.props.idx, cell);
	}

	render() {
		const cells = this.props.cells.map((cell, idx) => (
			<Cell
				idx={idx}
				key={idx}
				num={cell}
				handleClick={this.cellClicked}
				focused={this.props.focusedCell === idx}
			/>
		));
		return <div className="Subgrid">{cells}</div>;
	}
}

export default SubGrid;
