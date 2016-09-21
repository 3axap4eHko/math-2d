'use strict';

import Point from '../src/Point';
import Line from '../src/Line';

const point0 = new Point(0,0);
const pointA = new Point(0,4);
const pointB = new Point(3,0);
const pointC = new Point(6,-4);
const pointD = new Point(6,0);

describe('Line test suite', () => {
    it('Line constructor', () => {
        const line = new Line(pointA, pointB);

        expect(line.pointA).toEqual(pointA);
        expect(line.pointB).toEqual(pointB);
        expect(line.length).toEqual(Point.getDistance(pointA, pointB));
    });

    it('Line areEqual', () => {
        const lineA = new Line(pointA, pointB);
        const lineB = new Line(pointA, pointC);
        const lineC = new Line(pointA, pointB);

        expect(Line.areEqual(lineA, lineB)).toBeFalsy();
        expect(Line.areEqual(lineB, lineC)).toBeFalsy();
        expect(Line.areEqual(lineA, lineA)).toBeTruthy();
    });

    it('Line isAlign', () => {
        const lineA = new Line(pointA, pointC);

        expect(Line.isAlign(lineA, pointB)).toBeTruthy();
        expect(Line.isAlign(lineA, point0)).toBeFalsy();
    });

    it('Line areIntersect', () => {
        const lineA = new Line(pointA, pointC);
        const lineB = new Line(point0, pointD);
        const lineC = new Line(pointA, pointB);

        expect(Line.areIntersect(lineA, lineB)).toBeTruthy();
        expect(Line.areIntersect(lineA, lineC)).toBeFalsy();
    });
});
