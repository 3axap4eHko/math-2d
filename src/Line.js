'use strict';

import Point from './Point';
import LineEquation from './LineEquation';
import {sqr, sqrt} from './utils';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const Center = Symbol('center');
const Module = Symbol('module');
const Length = Symbol('length');
const Equation = Symbol('equation');

export default class Line {
    static areEqual(lineA, lineB, exact = false) {
        if (exact) {
            return Point.areEqual(lineA.pointA, lineB.pointA) && Point.areEqual(lineA.pointB, lineB.pointB) ||
                Point.areEqual(lineA.pointA, lineB.pointB) && Point.areEqual(lineA.pointB, lineB.pointA);
        }
        return LineEquation.areSame(lineA.equation, lineB.equation);
    }
    static isAlign(line, point, exact = false) {
        const isAlign = LineEquation.isAlign(line.equation, point);
        return isAlign &&
            (!exact || Point.isBetween(point, line.pointA, line.pointB) )
    }
    static areIntersect(lineA, lineB, exact = false) {
        const intersectPoint = Line.getIntersect(lineA, lineB);

        return Line.isAlign(lineB, intersectPoint, exact);
    }
    static isPerpendicular(lineA, lineB, exact = false) {
        const isPerpendicular = Line.isPerpendicular(lineA, lineB);

        return isPerpendicular && (!exact || )
    }
    static getPointsAtDistance(line, point, distance) {
        const {equation, center} = line;
        const {A:Ap, B:Bp, C:Cp} = LineEquation.getPerpendicular(equation, center);
        const {C} = equation;
        const x1 = ( Bp*C - Ap*Cp + distance * Ap * sqrt( sqr(Ap) + sqr(Bp) )  ) / (Ap - sqr(Bp));
        const y1 = equation.calcY(x1);
        const x2 = ( Bp*C - Ap*Cp - distance * Ap * sqrt( sqr(Ap) + sqr(Bp) )  ) / (Ap - sqr(Bp));
        const y2 = equation.calcY(x2);

        return [
            new Point(x1, y1),
            new Point(x2, y2),
        ]
    }
    static getPerpendicular(line) {
        const {length, equation, pointA, pointB, center} = line;
        const perpendicularEquation = LineEquation.getPerpendicular(equation, center);

        return new Line(pointA, pointB);
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