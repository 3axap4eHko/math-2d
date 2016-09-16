'use strict';

import Line from './Line';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const PointC = Symbol('pointC');
const LineA  = Symbol('lineA');
const LineB  = Symbol('lineB');
const LineC  = Symbol('lineC');

export default class Triangle {
    constructor(pointA, pointB, pointC) {
        this[PointA] = pointA;
        this[PointB] = pointB;
        this[PointC] = pointC;
        this[LineA]  = new Line(pointA, pointB);
        this[LineB]  = new Line(pointB, pointC);
        this[LineC]  = new Line(pointC, pointA);
    }
    get pointA() {
        return this[PointA];
    }
    get pointB() {
        return this[PointB];
    }
    get pointC() {
        return this[PointC];
    }
    get lineA() {
        return this[LineA];
    }
    get lineB() {
        return this[LineB];
    }
    get lineC() {
        return this[LineC];
    }
}