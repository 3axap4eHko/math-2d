'use strict';

import Point from './Point';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const Length = Symbol('length');

export default class Vector {
    constructor(pointA, pointB) {
        this[PointA] = pointA;
        this[PointB] = pointB;
        this[Length] = Point.getDistance(pointA, pointB);
    }
    get pointA() {
        return this[PointA];
    }
    get pointB() {
        return this[PointB];
    }
    get length() {
        return this[Length];
    }
}