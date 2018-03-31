const isUndefined = (v) => typeof v == 'undefined';
const getScaledRems = (size, scale) => `${size * scale}rem`;

export { isUndefined, getScaledRems };
