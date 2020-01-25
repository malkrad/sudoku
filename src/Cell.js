import React, { Component } from 'react';
import './Cell.css';

export class Cell extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.handleClick(this.props.idx);
	}

	render() {
		return <div className="Cell" onClick={this.handleClick}>{this.props.num !== 0 ? this.props.num : ''}</div>;
	}
}

export default Cell;
