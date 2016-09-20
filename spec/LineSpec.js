'use strict';

import Point from '../src/Point';
import Line from '../src/Line';

describe('Line test suite', () => {
    it('Line constructor', () => {
        const pointA = new Point(0,0);
        const pointB = new Point(1,1);
        const line = new Line(pointA, pointB);

        expect(line.pointA).toEqual(pointA);
        expect(line.pointB).toEqual(pointB);
        expect(line.length).toEqual(Point.getDistance(pointA, pointB));
    });

    it('Line areEqual', () => {
        const lineA = new Line(new Point(0,0), new Point(1, 1));
        const lineB = new Line(new Point(0.5,0.5), new Point(1, 1));
        const lineC = new Line(new Point(0,0), new Point(1, 0));

        expect(Line.areEqual(lineA, lineB)).toBeFalsy();
        expect(Line.areEqual(lineB, lineC)).toBeFalsy();
        expect(Line.areEqual(lineA, lineA)).toBeTruthy();
    });

    it('Line isAlign', () => {
        const lineA = new Line(new Point(0,0), new Point(2, 2));

        expect(Line.isAlign(lineA, new Point(1,1))).toBeTruthy();
        expect(Line.isAlign(lineA, new Point(3,3))).toBeFalsy();
    });

    it('Line areIntersect', () => {
        const lineA = new Line(new Point(0,0), new Point(1, 1));
        const lineB = new Line(new Point(1,0), new Point(0, 1));
        const lineC = new Line(new Point(2,0), new Point(3, 1));

        expect(Line.areIntersect(lineA, lineB)).toBeTruthy();
        expect(Line.areIntersect(lineB, lineC)).toBeFalsy();
        expect(Line.areIntersect(lineA, lineC)).toBeFalsy();
    });
});
