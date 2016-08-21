// Winning horizontal / vertical / diagonal rows.
// There are a couple of smarter ways to do it, e.g. we have a look at the
// difference between the numbers for diagonal rows. If we would want to show
// off, we could also represent solutions as bitmasks and compare those.

const solutions = [
  // Horizontal rows.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical rows.
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal rows.
  [0, 4, 8],
  [2, 4, 6]
];

module.exports = solutions;
