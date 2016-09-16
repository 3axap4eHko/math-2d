'use strict';

import Point from './Point';
import EquationLineCommon from './Equation/Line/Common';
import EquationLineSlope from './Equation/Line/Slope';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const Length = Symbol('length');
const CommonForm = Symbol('commonForm');
const SlopeForm = Symbol('slopeForm');

export default class Line {
    static isAlign(line, point, exact = false) {
        return line.commonEquation.calc(point) === 0 &&
            (!exact || Point.isBetween(point, line.pointA, line.pointB) )
    }
    static areEqual(lineA, lineB, exact = false) {
        if (exact) {
            return Point.areEqual(lineA.pointA, lineB.pointA) && Point.areEqual(lineA.pointB, lineB.pointB) ||
                Point.areEqual(lineA.pointA, lineB.pointB) && Point.areEqual(lineA.pointB, lineB.pointA);
        }
        return lineA.commonEquation.calc(lineB.pointA) === 0 && lineA.commonEquation.calc(lineB.pointB);
    }
    static areIntersect(lineA, lineB, exact = false) {
        const x = (lineB.slopeEquation.b - lineA.slopeEquation.b) / (lineA.slopeEquation.k - lineB.slopeEquation.k);
        const y = lineA.slopeEquation.calcY(x);
        const intersectPoint = new Point(x, y);

        return Line.isAlign(lineB, intersectPoint, exact);
    }

    constructor(pointA, pointB) {
        this[PointA] = pointA;
        this[PointB] = pointB;
        this[Length] = Point.getDistance(pointA, pointB);
        this[CommonForm] = new EquationLineCommon(pointA, pointB);
        this[SlopeForm] = new EquationLineSlope(pointA, pointB);
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
    get commonEquation() {
        return this[CommonForm];
    }
    get slopeEquation() {
        return this[SlopeForm];
    }
}