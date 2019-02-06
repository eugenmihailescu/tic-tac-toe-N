import PropTypes from "prop-types";
import React from "react";
import StateButton from "./StateButton";

/**
 * @description The game state component
 * @param {Readonly<P>} props
 * @returns {ReactNode}
 */
function GameState(props) {
  const textInput = React.createRef();

  return (
    <div className={"game-state " + props.css}>
      <div>{props.status}</div>
      <div className={props.canReset ? "hidden" : null}>
        <label htmlFor={textInput}>Size?</label>
        <input
          type="number"
          ref={textInput}
          defaultValue={props.dimension}
          min="2"
          disabled={props.playback}
          onChange={props.onSizeChanged}
        />
      </div>
      <StateButton
        caption="New game?"
        css="new-game"
        disabled={props.playback}
        onClick={props.onNewGameClick}
      />
      <StateButton
        caption="Reset?"
        css={props.canReset ? "" : "hidden"}
        disabled={props.playback}
        onClick={props.onNewGameClick}
      />
      <StateButton
        caption="Playback?"
        css="new-game"
        disabled={props.playback}
        onClick={props.onPlaybackClick}
      />
    </div>
  );
}

GameState.propTypes = {
  status: PropTypes.string.isRequired,
  canReset: PropTypes.bool.isRequired,
  playback: PropTypes.bool.isRequired,
  css: PropTypes.string.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
  onPlaybackClick: PropTypes.func.isRequired,
  dimension: PropTypes.number.isRequired
};

export default GameState;
