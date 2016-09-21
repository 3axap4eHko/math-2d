'use strict';

import Point from './Point';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _Length = Symbol('length');

export default class Vector {
    constructor(pointA, pointB) {
        this[_PointA] = pointA;
        this[_PointB] = pointB;
        this[_Length] = Point.getDistance(pointA, pointB);
    }
    get pointA() {
        return this[_PointA];
    }
    get pointB() {
        return this[_PointB];
    }
    get length() {
        return this[_Length];
    }
}