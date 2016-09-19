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
        return Math.abs(pointA.x - pointB.x) <= Number.EPSILON && Math.abs(pointA.y - pointB.y) <= Number.EPSILON;
    }
    static isBetween(point, pointA, pointB) {
        return isBetween(point.x, pointA.x, pointB.x) && isBetween(point.y, pointA.y, pointB.y)
    }
    static invert(point) {
        return new Point(-point.x, -point.y);
    }
    static add(pointA, pointB) {
        return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
    }
    static mult(pointA, value) {
        return new Point(pointA.x * value, pointA.y  * value);
    }
    static rotate(point, center, angle) {
        const x = center.x + (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle);
        const y = center.y + (point.y - center.y) * Math.cos(angle) + (point.x - center.x) * Math.sin(angle);
        return new Point(x, y);
    }
    static getMedium(pointA, pointB) {
        return Point.mult( Point.add(pointA, pointB), 0.5 );
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