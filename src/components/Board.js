import PropTypes from "prop-types";
import React, { Component } from "react";
import Square from "./Square";

/**
 * @description The game's board component
 * @class Board
 * @extends {Component}
 */
class Board extends Component {
  static propTypes = {
    dimension: PropTypes.number.isRequired,
    css: PropTypes.string.isRequired,
    squares: PropTypes.array.isRequired,
    winnerMoves: PropTypes.array.isRequired,
    onSquareClick: PropTypes.func.isRequired
  };

  /**
   * @description Renders the squares for a row
   * @param {Number} square_key The square key
   * @returns {ReactNode} Returns the square node
   * @memberof Board
   */
  renderSquare(square_key) {
    return (
      <Square
        key={square_key}
        css={this.props.winnerMoves.includes(square_key) ? "winner" : ""}
        value={this.props.squares[square_key]}
        disabled={null !== this.props.squares[square_key]}
        onClick={() => this.props.onSquareClick(square_key)}
      />
    );
  }

  /**
   * @description Renders one row for the game's board
   * @param {Number} row_key The row key
   * @returns {ReactNode} Returns the row's node
   * @memberof Board
   */
  renderBoardRow(row_key) {
    let row_squares = [];

    for (let i = 0; i < this.props.dimension; i += 1) {
      let key = row_key * this.props.dimension + i;
      let square = this.renderSquare(key);

      row_squares.push(square);
    }

    return (
      <div key={row_key} className="board-row">
        {row_squares}
      </div>
    );
  }

  /**
   * @description Renders the ganes' board
   * @returns {ReactNode} Returns the board node
   * @memberof Board
   */
  render() {
    let board_rows = [];

    for (var i = 0; i < this.props.dimension; i += 1) {
      board_rows.push(this.renderBoardRow(i));
    }

    return <div className={this.props.css}>{board_rows}</div>;
  }
}

export default Board;
