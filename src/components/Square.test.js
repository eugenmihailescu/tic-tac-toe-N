import Square from "./Square";
import React from "react";

test("rendering an empty square", () => {
  const onClick = () => {};
  const props = {
    disabled: false,
    css: "",
    value: undefined,
    onClick: onClick
  };
  const expectedSquare = <button className="" onClick={onClick} />;

  expect(Square(props)).toBe(expectedSquare);
});
