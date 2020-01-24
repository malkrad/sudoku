import React, { Component } from 'react';
import './Cell.css';

export class Cell extends Component {
	render() {
		return <div className="Cell">{this.props.num}</div>;
	}
}

export default Cell;
