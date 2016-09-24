'use strict';

export const is = (value, Class) => {
    if (value instanceof Class) return;
    throw new TypeError('Invalid value class');
};

export const sqr = value => Math.pow(value, 2);
export const sqrt = value => Math.pow(value, 0.5);

export const sqredDiff = (a, b) => sqr(a - b);
export const sqrtedSum = (a, b) => sqrt(a + b);

export const isBetween = (a, b, c) =>  Math.min(b,c) <= a && a <= Math.max(b,c);
export const pointToIdx = (x, y, width) => y * width + x;
export const idxToPoint = (idx, width) => ({ x: idx % width, y: (idx / width)|0 });
