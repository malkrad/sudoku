import React, { Component } from 'react';
import Subgrid from './Subgrid';
import './SudokuBoard.css';

export class SudokuBoard extends Component {
  static defaultProps = {
    subgrids: new Array(9).fill(new Array(9).fill(0))
  };
  render() {
    let focusedSubgrid, focusedCell;
    if (this.props.focusedCell) {
      [ focusedSubgrid, focusedCell ] = this.props.focusedCell;
    }
    const subgrids = this.props.subgrids.map((subgrid, idx) => (
      <Subgrid
        idx={idx}
        key={idx}
        cells={subgrid}
        handleClick={this.props.handleClick}
        focusedCell={focusedSubgrid === idx ? focusedCell : undefined}
        wrongCells={this.props.wrongCells[idx]}
        causingError={this.props.causingError[idx]}
        immutable={this.props.immutable[idx]}
        hints={this.props.hints[idx]}
      />
    ));
    let className = 'SudokuBoard';
    this.props.solved ? (className += ' solved') : (className += ' unsolved');
    return <div className={className}>{subgrids}</div>;
  }
}

export default SudokuBoard;
