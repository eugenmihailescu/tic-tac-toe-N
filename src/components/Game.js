import PropTypes from "prop-types";
import React, { Component } from "react";
import Board from "./Board";
import GameState from "./GameState";
import HistoryList from "./HistoryList.js";
import { getWinningMoves } from "./utils";

/**
 * @description The board component
 * @class Board
 * @extends {Component}
 */
class Game extends Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    smiley: PropTypes.object,
    dimension: function(props, propName, componentName) {
      if (props[propName] < 2) {
        return new Error("Board size cannot be less than 2x2");
      }
    }
  };

  /**
   * @description Get the game initial state
   * @param {Number} boardSize The game board size
   * @returns {Object}
   * @memberof Game
   */
  getInitialState(boardSize) {
    return {
      dimension: boardSize,
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(boardSize ** 2).fill(null) }]
    };
  }

  constructor(props) {
    super(props);
    this.playback = false;
    this.state = this.getInitialState(this.props.dimension);
    this.winning_moves = getWinningMoves(this.state.dimension);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  /**
   * @description Check whether there is at least one move to make
   * @param {Array} squares The board squares values
   * @returns {Boolean} Returns true if the game is over, false otherwise
   * @memberof Board
   */
  noMoreMoves(squares) {
    return !squares.filter(item => null === item).length;
  }

  /**
   * @description Get the game's winner
   * @param {Array} squares The board squares values
   * @returns {Object|NULL} On success returns the winner data, NULL otherwise
   * @memberof Board
   */
  getWinner(squares) {
    for (let i = 0; i < this.winning_moves.length; i += 1) {
      const move = this.winning_moves[i];
      const player = squares[move[0]];
      const move_won =
        move.filter(
          (value, index) => squares[value] === null || squares[value] !== player
        ).length === 0;
      if (move_won) {
        return { player: player, moves: move };
      }
    }
    return null;
  }

  /**
   * @description Handle the board's square click
   * @param {Number} i The square's index (0..dimension^2-1)
   * @returns {*}
   * @memberof Board
   */
  handleSquareClick(i) {
    const history = this.state.history;
    const last_move = history[history.length - 1];
    const squares = last_move.squares.slice();

    if (
      null !== squares[i] ||
      this.noMoreMoves(squares) ||
      this.getWinner(squares)
    ) {
      return;
    }

    squares[i] = this.state.xIsNext ? true : false;

    this.setState({
      ...this.state,
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  /**
   * @description Handle the board size change
   * @param {Event} event The UI change event
   * @memberof Game
   */
  handleBoardSizeChange(event) {
    const d = parseInt(event.target.value);

    this.setState(this.getInitialState(d));

    this.winning_moves = getWinningMoves(d);
  }

  /**
   * @description Starts a new game on user-request
   * @memberof Board
   */
  handleNewGameClick() {
    this.setState(this.getInitialState(this.state.dimension));
  }

  /**
   * @description Playback the game history
   * @memberof Game
   */
  handlePlaybackClick() {
    let stepNumber = 0;

    let replay = setInterval(() => {
      this.playback = stepNumber < this.state.history.length;

      if (!this.playback) {
        clearInterval(replay);
        stepNumber -= 1;
      }

      this.setState({
        ...this.state,
        stepNumber: stepNumber,
        xIsNext: stepNumber % 2 !== 0
      });
      stepNumber += 1;
    }, 500);
  }

  /**
   * @description Render the game's board
   * @returns {ReactNode} Returns the board node
   * @memberof Board
   */
  render() {
    const squares = this.state.history[this.state.stepNumber].squares.slice();
    const game_over = this.noMoreMoves(squares);
    const winner = this.getWinner(squares);

    let game_status;
    let game_css = "status";

    if (winner) {
      game_status = `${this.props.players[winner.player]} won ${
        this.props.smiley ? this.props.smiley[winner.player] : ""
      }`;
      game_css += " winner";
    } else {
      if (game_over) {
        game_status = `We both won ;-)`;
        game_css += " draw";
      } else {
        game_status = `Next player: ${this.props.players[this.state.xIsNext]}`;
      }
    }

    return (
      <div>
        <GameState
          dimension={this.state.dimension}
          status={game_status}
          playback={this.playback}
          canReset={!(!this.state.stepNumber || winner || game_over)}
          css={"inline " + game_css}
          onNewGameClick={() => this.handleNewGameClick()}
          onPlaybackClick={() => this.handlePlaybackClick()}
          onSizeChanged={this.handleBoardSizeChange.bind(this)}
        />
        <div>
          <Board
            dimension={this.state.dimension}
            css={game_over || winner ? "board game-over" : "board"}
            squares={squares}
            winnerMoves={winner ? winner.moves : []}
            onSquareClick={this.handleSquareClick.bind(this)}
          />
          <HistoryList
            history={this.state.history}
            players={this.props.players}
            playbackStepNo={this.playback ? this.state.stepNumber : null}
            onClick={i => {
              this.setState({
                ...this.state,
                stepNumber: i,
                xIsNext: i % 2 !== 0
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Game;
