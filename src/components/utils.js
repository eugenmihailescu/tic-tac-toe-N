/**
 * @description Calculates the winning moves
 * @param {Number} dimension The games' board square dimension
 * @returns {Array} Returns an array of winning moves
 */
export function getWinningMoves(dimension) {
  let winning_moves = [];

  for (let line = 0; line < dimension; line += 1) {
    let moves = [...Array(dimension).keys()];

    // wining line
    moves = moves.map(key => key + dimension * line);
    winning_moves.push(moves);

    // wining column
    moves = moves.map(key => line + dimension * (key % dimension));
    winning_moves.push(moves);
  }

  // wining diagonals
  let diag_1 = Array(dimension).fill(0);
  let diag_2 = Array(dimension).fill(0);
  diag_1 = diag_1.map((val, key) => key * (dimension + 1));
  diag_2 = diag_2.map((val, key) => (key + 1) * (dimension - 1));

  winning_moves.push(diag_1);
  winning_moves.push(diag_2);

  return winning_moves;
}
