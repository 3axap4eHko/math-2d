'use strict';

import Point from './Point';
import Line from './Line';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _Middle = Symbol('middle');
const _Module = Symbol('module');
const _Length = Symbol('length');
const _Line = Symbol('line');

export default class LineSegment {
    static getDX(lineSegment) {
        return Point.getDX(lineSegment.pointA, lineSegment.pointB);
    }
    static getDY(lineSegment) {
        return Point.getDY(lineSegment.pointA, lineSegment.pointB);
    }
    static areEqual(lineSegmentA, lineSegmentB) {
        return Point.areEqual(lineSegmentA.pointA, lineSegmentB.pointA) && Point.areEqual(lineSegmentA.pointB, lineSegmentB.pointB) ||
            Point.areEqual(lineSegmentA.pointA, lineSegmentB.pointB) && Point.areEqual(lineSegmentA.pointB, lineSegmentB.pointA);
    }
    static isAlign(lineSegment, point) {
        const isAlign = Line.isAlign(lineSegment.line, point);
        return isAlign && Point.isBetween(point, lineSegment.pointA, lineSegment.pointB);
    }
    static areIntersect(lineSegmentA, lineSegmentB) {
        const intersectPoint = Line.getIntersect(lineSegmentA.line, lineSegmentB.line);
        return LineSegment.isAlign(lineSegmentA, intersectPoint) && LineSegment.isAlign(lineSegmentB, intersectPoint);
    }
    static getPerpendicular(lineSegment, point) {
        const lineEquation = Line.getPerpendicular(lineSegment.line, point);
        const intersection = Line.getIntersect(lineSegment.line, lineEquation);

        return new LineSegment(point, intersection);
    }
    constructor(pointA, pointB) {
        this[_PointA] = pointA;
        this[_PointB] = pointB;
        this[_Middle] = Point.getMedium(pointA, pointB);
        this[_Module] = new Point(pointA.x - pointB.x, pointA.y - pointB.y);
        this[_Length] = Point.getDistance(pointA, pointB);
        this[_Line] = Line.createFromPoints(pointA, pointB);
    }
    get pointA() {
        return this[_PointA];
    }
    get pointB() {
        return this[_PointB];
    }
    get center() {
        return this[_Middle];
    }
    get module() {
        return this[_Module];
    }
    get length() {
        return this[_Length];
    }
    get line() {
        return this[_Line];
    }
}