import PropTypes from "prop-types";
import React from "react";

/**
 * @description The function component for rendering a square
 * @param {Readonly<P>} props The component properties
 * @returns {ReactNode} Returns the square node
 */
function Square(props) {
  let css = "square " + props.css;

  if (null !== props.value) {
    css += " " + (props.value ? "x" : "o");
  }

  return (
    <button className={css} disabled={props.disabled} onClick={props.onClick} />
  );
}

Square.propTypes = {
  disabled: PropTypes.bool.isRequired,
  css: PropTypes.string.isRequired,
  value: PropTypes.any,
  onClick: PropTypes.func.isRequired
};

export default Square;
