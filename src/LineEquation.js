'use strict';

import Point from './Point';
import {sqrt, sqr} from './utils';

const _A = Symbol('A');
const _B = Symbol('B');
const _C = Symbol('C');
const _Length = Symbol('Length');


export default class LineEquation {
    static getDistance(lineEquation, point) {
        const m = lineEquation.calc(point);
        const n = lineEquation.length;
        return Math.abs(m / n);
    }
    static getAngle(lineEquationA, lineEquationB) {
        const m = lineEquationA.A * lineEquationB.B - lineEquationA.B * lineEquationB.A;
        const n = lineEquationA.A * lineEquationB.A + lineEquationA.B * lineEquationB.B;
        return Math.atan(m/n);
    }
    static areSame(lineEquationA, lineEquationB) {
        return lineEquationA.A/lineEquationB.A === lineEquationA.B/lineEquationB.B &&
            lineEquationA.A/lineEquationB.A === lineEquationA.C/lineEquationB.C;
    }
    static areParallel(lineEquationA, lineEquationB) {
        return Math.abs(lineEquationA.A * lineEquationB.B - lineEquationA.B * lineEquationB.A) <= Number.EPSILON;
    }
    static getPerpendicular(lineEquation, point) {
        const A = lineEquation.B;
        const B = - lineEquation.A;
        const C = - A * point.x - B * point.y;

        return new LineEquation(A, B, C);
    }
    static arePerpendicular(lineEquationA, lineEquationB) {
        return Math.abs(lineEquationA.A * lineEquationB.A + lineEquationA.B * lineEquationB.B) <= Number.EPSILON;
    }
    static getIntersect(lineEquationA, lineEquationB) {
        const {A:A1, B:B1, C:C1} = lineEquationA;
        const {A:A2, B:B2, C:C2} = lineEquationB;
        const x = (B2*C1/B1 + C2) / ( B2*A1/B1 - A2);

        return lineEquationA.calcY(x);
    }
    static isAlign(lineEquation, point) {
        return lineEquation.calc(point) === 0;
    }
    static getPointsAtDistance(lineEquation, point, distance) {
        const {A:Ap, B:Bp, C:Cp} = LineEquation.getPerpendicular(lineEquation, point);
        const {A, B, C} = lineEquation;
        const x1 = ( Bp*C - B*Cp + distance * B * sqrt( sqr(Ap) + sqr(Bp) )  ) / (B * Ap - Bp * A);
        const x2 = ( Bp*C - B*Cp - distance * B * sqrt( sqr(Ap) + sqr(Bp) )  ) / (B * Ap - Bp * A);

        return [
            lineEquation.calcY(x1),
            lineEquation.calcY(x2),
        ]
    }

    static createFromPoints(pointA, pointB) {
        const A = pointB.y - pointA.y;
        const B = pointA.x - pointB.x;
        const C = - pointA.x * A + pointA.y * B;

        return new LineEquation(A, B, C);
    }
    constructor(A, B, C) {
        this[_A] = A;
        this[_B] = B;
        this[_C] = C;
        this[_Length] = sqrt( sqr(A) + sqr(B) );
    }
    get A() {
        return this[_A];
    }
    get B() {
        return this[_B];
    }
    get C() {
        return this[_C];
    }
    get length() {
        return this[_Length];
    }
    calc(point) {
        return this[_A] * point.x + this[_B] * point.y + this[_C];
    }
    calcX(y) {
        return new Point(-(this[_B] * y + this[_C]) / this[_A], y);
    }
    calcY(x) {
        return new Point(x, -(this[_A] * x + this[_C]) / this[_B]);
    }
}