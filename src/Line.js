'use strict';

import Point from './Point';
import LineEquation from './LineEquation';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const Center = Symbol('center');
const Module = Symbol('module');
const Length = Symbol('length');
const Equation = Symbol('equation');

export default class Line {
    static areEqual(lineA, lineB) {
        return Point.areEqual(lineA.pointA, lineB.pointA) && Point.areEqual(lineA.pointB, lineB.pointB) ||
            Point.areEqual(lineA.pointA, lineB.pointB) && Point.areEqual(lineA.pointB, lineB.pointA);
    }
    static isAlign(line, point) {
        const isAlign = LineEquation.isAlign(line.equation, point);
        return isAlign && Point.isBetween(point, line.pointA, line.pointB);
    }
    static areIntersect(lineA, lineB) {
        const intersectPoint = LineEquation.getIntersect(lineA.equation, lineB.equation);

        return Line.isAlign(lineA, intersectPoint) && Line.isAlign(lineB, intersectPoint);
    }
    constructor(pointA, pointB) {
        this[PointA] = pointA;
        this[PointB] = pointB;
        this[Center] = Point.getMedium(pointA, pointB);
        this[Module] = new Point(pointA.x - pointB.x, pointA.y - pointB.y);
        this[Length] = Point.getDistance(pointA, pointB);
        this[Equation] = LineEquation.createFromPoints(pointA, pointB);
    }
    get pointA() {
        return this[PointA];
    }
    get pointB() {
        return this[PointB];
    }
    get center() {
        return this[Center];
    }
    get module() {
        return this[Module];
    }
    get length() {
        return this[Length];
    }
    get equation() {
        return this[Equation];
    }
}