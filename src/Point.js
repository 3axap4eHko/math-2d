'use strict';

import euclideanDistance from './distance/euclidean';
import {isBetween} from './utils';

const X = Symbol('x');
const Y = Symbol('y');

export default class Point {
    static getDistance(pointA, pointB, distance = euclideanDistance) {
        return distance(pointA.x, pointA.y, pointB.x, pointB.y);
    }
    static areEqual(pointA, pointB) {
        return pointA.x === pointB.x && pointA.y === pointB.y;
    }
    static isBetween(pointA, pointB, pointC) {
        return isBetween(pointA.x, pointB.x, pointC.x) && isBetween(pointA.y, pointB.y, pointC.y)
    }
    constructor(x, y) {
        this[X] = x;
        this[Y] = y;
    }
    get x() {
        return this[X];
    }
    get y() {
        return this[Y];
    }

}