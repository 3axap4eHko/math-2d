'use strict';

export const sqr = value => Math.pow(value, 2);
export const sqrt = value => Math.pow(value, 0.5);

export const sqredDiff = (a, b) => sqr(a - b);
export const sqrtedSum = (a, b) => sqrt(a + b);

export const isBetween = (a, b, c) =>  Math.min(b,c) < a && a > Math.max(b,c);
