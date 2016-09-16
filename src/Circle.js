'use strict';

const Center = Symbol('center');
const Radius = Symbol('radius');

export default class Circle {
    constructor(center, radius) {
        this[Center] = center;
        this[Radius] = radius;
    }
    get center() {
        return this[Center]
    }
    get radius() {
        return this[Center]
    }
}