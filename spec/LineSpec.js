'use strict';

import Point from '../src/Point';
import Line from '../src/Line';

const point0 = new Point(0,0);
const pointA = new Point(3,0);
const pointB = new Point(0,4);
const pointC = new Point(6,-4);
const pointE = new Point(-1,-3);
const distance1 = 1;
const distance5 = 5;

describe('Line test suite', () => {

    it('constructor', () => {
        const A = 1;
        const B = 2;
        const C = 3;
        const equation = new Line(A, B, C);
        const x = 5;
        const y = equation.calcY(x).y;

        expect(equation.calcX(y).x).toEqual(x);
        expect(equation.calc(new Point(x, y))).toEqual(0);
    });
    it('createFromPoints', () => {
        const eqA = Line.createFromPoints(pointA, pointB);
        const eqB = Line.createFromPoints(pointB, pointA);
        expect(Line.isAlign(eqA, pointA)).toBeTruthy();
        expect(Line.isAlign(eqA, pointC)).toBeTruthy();
        expect(Line.isAlign(eqB, pointA)).toBeTruthy();
        expect(Line.isAlign(eqB, pointC)).toBeTruthy();
    });

    it('getDistance', () => {
        const eqA = Line.createFromPoints(pointA, point0);
        const eqB = Line.createFromPoints(pointB, point0);

        expect(Line.getDistance(eqA, pointB)).toEqual(Point.getDistance(point0, pointB));
        expect(Line.getDistance(eqB, pointA)).toEqual(Point.getDistance(point0, pointA));
    });
    it('getAngle', () => {
        const eqA = Line.createFromPoints(pointA, point0);
        const eqB = Line.createFromPoints(pointB, point0);
        const eqC = Line.createFromPoints(pointA, pointB);
        const a = Point.getDistance(point0, pointA);
        const b = Point.getDistance(point0, pointB);

        expect(Line.getAngle(eqA, eqB)).toEqual(Math.PI/2);
        expect(Line.getAngle(eqC, eqA)).toEqual(Math.atan(b/a));
        expect(Line.getAngle(eqC, eqB)).toEqual(-Math.atan(a/b));
    });
    it('areSame', () => {
        const eqA = Line.createFromPoints(pointA, pointB);
        const eqB = Line.createFromPoints(pointA, pointC);

        expect(Line.areSame(eqA, eqB)).toBeTruthy()
    });
    it('areParallel', () => {
        const eqA = Line.createFromPoints(pointA, pointB);
        const eqB = Line.createFromPoints(pointA, pointC);

        expect(Line.areParallel(eqA, eqB)).toBeTruthy()
    });
    it('getPerpendicular', () => {
        const eqA = Line.createFromPoints(pointC, point0);
        const eqB = Line.createFromPoints(pointC, point0);
        const eqAp = Line.getPerpendicular(eqA, point0);
        const eqBp = Line.getPerpendicular(eqB, point0);

        expect(eqAp.calc(point0)).toEqual(0);
        expect(eqBp.calc(point0)).toEqual(0);
    });
    it('arePerpendicular', () => {
        const eqA = Line.createFromPoints(pointA, pointB);
        const eqB = Line.getPerpendicular(eqA, point0);

        expect(Line.arePerpendicular(eqA, eqB)).toBeTruthy()
    });
    it('getIntersect', () => {
        const eqA = Line.createFromPoints(pointA, point0);
        const eqB = Line.createFromPoints(pointB, point0);
        const intersectPoint = Line.getIntersect(eqA, eqB);

        expect(Point.areEqual(intersectPoint, point0)).toBeTruthy()
    });
    it('isAlign', () => {
        const eqA = Line.createFromPoints(pointA, pointB);
        expect(Line.isAlign(eqA, pointC)).toBeTruthy()
    });

    it('getPointsAtDistance', () => {
        const eqA = Line.createFromPoints(point0, pointA);
        const pointsA = Line.getPointsAtDistance(eqA, pointA, distance1);

        expect(pointsA.length).toEqual(2);
        pointsA.forEach( point => {
            expect(eqA.calc(point)).toEqual(0);
            expect(Point.getDistance(pointA, point)).toEqual(distance1);
        });

        const eqB = Line.createFromPoints(pointA, pointB);
        const pointsB = Line.getPointsAtDistance(eqB, pointA, distance5);

        expect(pointsB.length).toEqual(2);
        pointsB.forEach( point => {
            expect(eqB.calc(point)).toEqual(0);
            expect(Point.getDistance(pointA, point)).toEqual(distance5);
        });
    });
});
