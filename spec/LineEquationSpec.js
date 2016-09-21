'use strict';

import Point from '../src/Point';
import LineEquation from '../src/LineEquation';

const pointA = new Point(3,0);
const pointB = new Point(0,4);
const pointC = new Point(0,0);
const pointD = new Point(3,4);
const pointE = new Point(-3,4);

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

    it('LineEquation getDistance', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointC);
        const eqB = LineEquation.createFromPoints(pointB, pointC);

        expect(LineEquation.getDistance(eqA, pointB)).toEqual(Point.getDistance(pointC, pointB));
        expect(LineEquation.getDistance(eqB, pointA)).toEqual(Point.getDistance(pointC, pointA));
    });
    it('LineEquation getAngle', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointC);
        const eqB = LineEquation.createFromPoints(pointB, pointC);
        const eqC = LineEquation.createFromPoints(pointA, pointB);
        const a = Point.getDistance(pointC, pointA);
        const b = Point.getDistance(pointC, pointB);

        expect(LineEquation.getAngle(eqA, eqB)).toEqual(Math.PI/2);
        expect(LineEquation.getAngle(eqC, eqA)).toEqual(Math.atan(b/a));
        expect(LineEquation.getAngle(eqC, eqB)).toEqual(-Math.atan(a/b));
    });
    it('LineEquation areSame', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const x = 6;
        const pointD = eqA.calcY(x);
        const eqB = LineEquation.createFromPoints(pointA, pointD);

        expect(LineEquation.areSame(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation areParallel', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const x = 6;
        const pointD = eqA.calcY(x);
        const eqB = LineEquation.createFromPoints(pointA, pointD);

        expect(LineEquation.areParallel(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation getPerpendicular', () => {
        const eqA = LineEquation.createFromPoints(pointD, pointC);
        const eqB = LineEquation.createFromPoints(pointD, pointC);
        const eqAp = LineEquation.getPerpendicular(eqA, pointC);
        const eqBp = LineEquation.getPerpendicular(eqB, pointC);

        expect(eqAp.calc(pointC)).toEqual(0);
        expect(eqBp.calc(pointC)).toEqual(0);
    });
    it('LineEquation arePerpendicular', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const eqB = LineEquation.getPerpendicular(eqA, pointC);

        expect(LineEquation.arePerpendicular(eqA, eqB)).toBeTruthy()
    });
    it('LineEquation getIntersect', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointC);
        const eqB = LineEquation.createFromPoints(pointB, pointC);
        const intersectPoint = LineEquation.getIntersect(eqA, eqB);

        expect(Point.areEqual(intersectPoint, pointC)).toBeTruthy()
    });
    it('LineEquation isAlign', () => {
        const eqA = LineEquation.createFromPoints(pointA, pointB);
        const x = 6;
        const pointD = eqA.calcY(x);
        expect(LineEquation.isAlign(eqA, pointD)).toBeTruthy()
    });
    it('LineEquation getPointsAtDistance', () => {
        const distance = 1;
        const eqA = LineEquation.createFromPoints(pointC, pointA);
        const pointsA = LineEquation.getPointsAtDistance(eqA, pointA, 1);
        expect(pointsA.length).toEqual(2);
        pointsA.forEach( point => {
            expect(eqA.calc(point)).toEqual(0);
            expect(Point.getDistance(pointA, point)).toEqual(distance);
        });
        const eqB = LineEquation.createFromPoints(pointE, pointC);
        const pointsB = LineEquation.getPointsAtDistance(eqB, pointC, 1);
        expect(pointsB.length).toEqual(2);
        pointsB.forEach( point => {
            expect(eqB.calc(point)).toEqual(0);
            expect(Point.getDistance(pointC, point)).toEqual(distance);
        });
    });
});
