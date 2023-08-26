export const sinByRadians = (radians: number) => {
  return Math.round(Math.sin(radians) * 1000) / 1000;
};

export const cosByRadians = (radians: number) => {
  return Math.round(Math.cos(radians) * 1000) / 1000;
};

export const tgByRadians = (radians: number) => {
  return Math.round(Math.tan(radians) * 1000) / 1000;
};
