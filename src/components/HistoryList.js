import PropTypes from "prop-types";
import React from "react";
import HistoryItem from "./HistoryItem";

/**
 * @description The history list component
 * @param {Readonly<P>} props
 * @returns {ReactNode}
 */
function HistoryList(props) {
  const items = props.history.map((item, index) => {
    const player = props.players[0 !== index % 2];
    const caption =
      (index ? player : "Go to ") + (index ? ` move #${index}` : "game start");

    return (
      <HistoryItem
        key={index}
        index={index}
        caption={caption}
        css={props.playbackStepNo === index ? "playback" : null}
        onClick={() => props.onClick(index)}
      />
    );
  });

  return props.history.length > 1 ? <ul className="history">{items}</ul> : null;
}

HistoryList.propTypes = {
  history: PropTypes.array.isRequired,
  players: PropTypes.object.isRequired,
  playbackStepNo: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default HistoryList;
