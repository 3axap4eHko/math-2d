'use strict';

import Point from '../src/Point';
import LineSegment from '../src/LineSegment';

const point0 = new Point(0,0);
const pointA = new Point(0,4);
const pointB = new Point(3,0);
const pointC = new Point(6,-4);
const pointD = new Point(6,0);

describe('Line test suite', () => {
    it('Line constructor', () => {
        const line = new LineSegment(pointA, pointB);

        expect(line.pointA).toEqual(pointA);
        expect(line.pointB).toEqual(pointB);
        expect(line.length).toEqual(Point.getDistance(pointA, pointB));
    });

    it('Line areEqual', () => {
        const lineA = new LineSegment(pointA, pointB);
        const lineB = new LineSegment(pointA, pointC);
        const lineC = new LineSegment(pointA, pointB);

        expect(LineSegment.areEqual(lineA, lineB)).toBeFalsy();
        expect(LineSegment.areEqual(lineB, lineC)).toBeFalsy();
        expect(LineSegment.areEqual(lineA, lineA)).toBeTruthy();
    });

    it('Line isAlign', () => {
        const lineA = new LineSegment(pointA, pointC);

        expect(LineSegment.isAlign(lineA, pointB)).toBeTruthy();
        expect(LineSegment.isAlign(lineA, point0)).toBeFalsy();
    });

    it('Line areIntersect', () => {
        const lineA = new LineSegment(pointA, pointC);
        const lineB = new LineSegment(point0, pointD);
        const lineC = new LineSegment(pointA, pointB);

        expect(LineSegment.areIntersect(lineA, lineB)).toBeTruthy();
        expect(LineSegment.areIntersect(lineA, lineC)).toBeFalsy();
    });
});
