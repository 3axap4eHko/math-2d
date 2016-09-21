'use strict';

import Point from '../src/Point';
import LineEquation from '../src/LineEquation';

const point0 = new Point(0,0);
const pointA = new Point(3,0);
const pointB = new Point(0,4);
const pointC = new Point(6,-4);
const pointE = new Point(-1,-3);
const distance1 = 1;
const distance5 = 5;

describe('LineEquation test suite', () => {

    it('LineEquation constructor', () => {
        const A = 1;
        const B = 2;
        const C = 3;
        const equation = new LineEquation(A, B, C);
        const x = 5;
        const y = equation.calcY(x).y;

        expect(equation.calcX(y).x).toEqual(x);
        expect(equation.calc(new Point(x, y))).toEqual(0);
    });
    it('LineEquation createFromPoints', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const eqB = LineEquation.createFromPoints(pointB, pointA);
        expect(LineEquation.isAlign(eqA, pointA)).toBeTruthy();
        expect(LineEquation.isAlign(eqA, pointC)).toBeTruthy();
        expect(LineEquation.isAlign(eqB, pointA)).toBeTruthy();
        expect(LineEquation.isAlign(eqB, pointC)).toBeTruthy();
    });

    it('LineEquation getDistance', () => {
        const eqA = LineEquation.createFromPoints(pointA, point0);
        const eqB = LineEquation.createFromPoints(pointB, point0);

        expect(LineEquation.getDistance(eqA, pointB)).toEqual(Point.getDistance(point0, pointB));
        expect(LineEquation.getDistance(eqB, pointA)).toEqual(Point.getDistance(point0, pointA));
    });
    it('LineEquation getAngle', () => {
        const eqA = LineEquation.createFromPoints(pointA, point0);
        const eqB = LineEquation.createFromPoints(pointB, point0);
        const eqC = LineEquation.createFromPoints(pointA, pointB);
        const a = Point.getDistance(point0, pointA);
        const b = Point.getDistance(point0, pointB);

        expect(LineEquation.getAngle(eqA, eqB)).toEqual(Math.PI/2);
        expect(LineEquation.getAngle(eqC, eqA)).toEqual(Math.atan(b/a));
        expect(LineEquation.getAngle(eqC, eqB)).toEqual(-Math.atan(a/b));
    });
    it('LineEquation areSame', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const eqB = LineEquation.createFromPoints(pointA, pointC);

        expect(LineEquation.areSame(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation areParallel', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const eqB = LineEquation.createFromPoints(pointA, pointC);

        expect(LineEquation.areParallel(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation getPerpendicular', () => {
        const eqA = LineEquation.createFromPoints(pointC, point0);
        const eqB = LineEquation.createFromPoints(pointC, point0);
        const eqAp = LineEquation.getPerpendicular(eqA, point0);
        const eqBp = LineEquation.getPerpendicular(eqB, point0);

        expect(eqAp.calc(point0)).toEqual(0);
        expect(eqBp.calc(point0)).toEqual(0);
    });
    it('LineEquation arePerpendicular', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const eqB = LineEquation.getPerpendicular(eqA, point0);

        expect(LineEquation.arePerpendicular(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation getIntersect', () => {
        const eqA = LineEquation.createFromPoints(pointA, point0);
        const eqB = LineEquation.createFromPoints(pointB, point0);
        const intersectPoint = LineEquation.getIntersect(eqA, eqB);

        expect(Point.areEqual(intersectPoint, point0)).toBeTruthy()
    });
    it('LineEquation isAlign', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        expect(LineEquation.isAlign(eqA, pointC)).toBeTruthy()
    });

    it('LineEquation getPointsAtDistance', () => {
        const eqA = LineEquation.createFromPoints(point0, pointA);
        const pointsA = LineEquation.getPointsAtDistance(eqA, pointA, distance1);

        expect(pointsA.length).toEqual(2);
        pointsA.forEach( point => {
            expect(eqA.calc(point)).toEqual(0);
            expect(Point.getDistance(pointA, point)).toEqual(distance1);
        });

        const eqB = LineEquation.createFromPoints(pointA, pointB);
        const pointsB = LineEquation.getPointsAtDistance(eqB, pointA, distance5);

        expect(pointsB.length).toEqual(2);
        pointsB.forEach( point => {
            expect(eqB.calc(point)).toEqual(0);
            expect(Point.getDistance(pointA, point)).toEqual(distance5);
        });
    });
});
