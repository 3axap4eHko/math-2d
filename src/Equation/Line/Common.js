'use strict';

const A = Symbol('A');
const B = Symbol('B');
const C = Symbol('C');

export default class Common {

    constructor(pointA, pointB) {
        this[A] = pointB.y - pointA.y;
        this[B] = pointA.x - pointB.x;
        this[C] = - pointA.x * this[A] + pointA.y * this[B];
    }
    get A() {
        return this[A];
    }
    get B() {
        return this[B];
    }
    get C() {
        return this[C];
    }
    calc(point) {
        return this[A] * point.x + this[B] * point.y + this[C];
    }
}