import PropTypes from "prop-types";
import React from "react";

/**
 * @description The history item
 * @param {Readonly<P>} props
 * @returns {ReactNode}
 */
function HistoryItem(props) {
  return (
    <li className={props.css}>
      <button onClick={props.onClick}>{props.caption}</button>
    </li>
  );
}

HistoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  css: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default HistoryItem;
