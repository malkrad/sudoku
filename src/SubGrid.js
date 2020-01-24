import React, { Component } from 'react';
import './SubGrid.css';
import Cell from './Cell';

export class SubGrid extends Component {
	static defaultProps = {
		cells: new Array(9).fill(0)
	};
	render() {
		const cells = this.props.cells.map((cell, idx) => <Cell idx={idx} key={idx} num={cell} />);
		return <div className="SubGrid">{cells}</div>;
	}
}

export default SubGrid;
