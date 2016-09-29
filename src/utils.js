'use strict';

export const sqr = value => Math.pow(value, 2);
export const sqrt = value => Math.pow(value, 0.5);
export const cube = value => Math.pow(value, 3);

export const sqredDiff = (a, b) => sqr(a - b);
export const sqrtedSum = (a, b) => sqrt(a + b);

export const isBetween = (a, b, c) =>  Math.min(b,c) <= a && a <= Math.max(b,c);
export const pointToIdx = (x, y, width) => y * width + x;
export const idxToPoint = (idx, width) => ({ x: idx % width, y: Math.trunc(idx / width) });

export const clamp = (value, ...borders) => {
    var min = borders[0];
    var max = borders[1];
    if (borders.length == 1) {
        max = min;
        min = 0;
    }
    if (value > max) return max;
    if (value < min) return min;
    return value;
};

export const circleModule = (value, module) => {
    return value - Math.trunc(value/module);
};

export const circleModuleCycle = (value, module) => {
    const circleCount = Math.trunc(value/module);
    if (circleCount%2) {
        return value - circleCount;
    }
    return module - (value - circleCount);
};

export const toProgress = (from ,to, value) => {
    return (value-from)/(to - from);
};

export const progressFactory = (from ,to) => {
    return value => toProgress(from, to, value);
};

export const transitionFactory = (from = 0, to = 1, func = v => v) => {
    const module = to - from;
    return progress => func(from + module*progress);
};

export const transitionStepFactory = (from = 0, to = 1, stepCount = 100, func = v => v) => {
    const stepSize = (to-from)/stepCount;
    return step => func(from + stepSize*step);
};
