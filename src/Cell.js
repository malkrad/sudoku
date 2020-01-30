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
		let className = 'Cell';
		if (this.props.immutable) className += ' immutable';
		else className += ' mutable';
		if (this.props.focused) className += ' focused';
		if (this.props.wrongCell) className += ' wrongCell';
		if (this.props.causingError) className += ' causingError';
		if (this.props.hint) className += ' hint';
		return (
			<div className={className} onClick={this.handleClick}>
				{this.props.num !== 0 ? this.props.num : ''}
			</div>
		);
	}
}

export default Cell;
