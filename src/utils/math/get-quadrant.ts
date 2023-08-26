const QUADRANT_SIZE_IN_RADIANS = Math.PI / 2;
let quadrantInRadians;

export const getQuadrant = (radians: number) => {
  quadrantInRadians = Math.floor(-radians / QUADRANT_SIZE_IN_RADIANS);
  return Math.sign(quadrantInRadians) >= 0 ? quadrantInRadians + 1 : quadrantInRadians + 5;
};
