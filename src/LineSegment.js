'use strict';

import Point from './Point';
import Line from './Line';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _Middle = Symbol('middle');
const _Direction = Symbol('direction');
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
    static getPointsAtDistance(lineSegment, point, distance) {
        return Line
            .getPointsAtDistance(lineSegment.line, point, distance)
            .filter( point => LineSegment.isAlign(lineSegment, point) );
    }
    static rotate(lineSegment, center, angle) {
        const pointA = Point.rotate(lineSegment.pointA, center, angle);
        const pointB = Point.rotate(lineSegment.pointB, center, angle);

        return new LineSegment(pointA, pointB);
    }
    constructor(pointA, pointB) {
        this[_PointA] = pointA;
        this[_PointB] = pointB;
        this[_Middle] = Point.getMiddle(pointA, pointB);
        this[_Direction] = new Point(pointA.x - pointB.x, pointA.y - pointB.y);
        this[_Length] = Point.getDistance(pointA, pointB);
        this[_Line] = Line.createFromPoints(pointA, pointB);
    }
    get pointA() {
        return this[_PointA];
    }
    get pointB() {
        return this[_PointB];
    }
    get middle() {
        return this[_Middle];
    }
    get direction() {
        return this[_Direction];
    }
    get length() {
        return this[_Length];
    }
    get line() {
        return this[_Line];
    }
    toObject() {
        return {
            pointA: this[_PointA].toObject(),
            pointB: this[_PointB].toObject()
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}