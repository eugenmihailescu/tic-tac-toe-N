import React from "react";
import PropTypes from "prop-types";

/**
 * @description A game state button
 * @param {Readonly<P>} props
 * @returns {ReactNode}
 */
function StateButton(props) {
  return (
    <button
      className={props.css}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.caption}
    </button>
  );
}

StateButton.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  css: PropTypes.string.isRequired
};

export default StateButton;
