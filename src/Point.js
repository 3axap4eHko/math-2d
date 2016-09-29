'use strict';

import euclideanDistance from './distance/euclidean';
import {isBetween, sqrt, sqr, pointToIdx} from './utils';

const _X = Symbol('x');
const _Y = Symbol('y');
const _Module = Symbol('module');

export default class Point {
    static getDX(pointA, pointB) {
        return pointB.x - pointA.x;
    }
    static getDY(pointA, pointB) {
        return pointB.y - pointA.y;
    }
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
    static sub(pointA, pointB) {
        return new Point(pointB.x - pointA.x, pointB.y + pointA.y);
    }
    static scale(pointA, scale) {
        return new Point(pointA.x * scale, pointA.y  * scale);
    }
    static mult(pointA, pointB) {
        return pointA.x*pointB.x + pointA.y*pointB.y;
    }
    static rotate(point, center, angle) {
        const x = center.x + (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle);
        const y = center.y + (point.y - center.y) * Math.cos(angle) + (point.x - center.x) * Math.sin(angle);
        return new Point(x, y);
    }
    static getProgress(pointA, pointB, progress) {
        const vector = Point.sub(pointA, pointB);
        return Point.add(pointA, Point.scale(vector, progress) );
    }
    static getMiddle(pointA, pointB) {
        return Point.scale( Point.add(pointA, pointB), 0.5 );
    }
    static getIdx(point, width) {
        return pointToIdx(point.x, point.y, width);
    }
    constructor(x, y) {
        this[_X] = x;
        this[_Y] = y;
        this[_Module] = sqrt( sqr(x) + sqr(y) );
    }
    get x() {
        return this[_X];
    }
    get y() {
        return this[_Y];
    }
    get module() {
        return this[_Module];
    }
    toObject() {
        return {x: this[_X], y: this[_Y]};
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}

Point.ZERO = new Point(0,0);