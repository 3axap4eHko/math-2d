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
    static isParallel(lineEquationA, lineEquationB) {
        return Math.abs(lineEquationA.A * lineEquationB.B - lineEquationA.B * lineEquationB.A) <= Number.EPSILON;
    }
    static isPerpendicular(lineEquationA, lineEquationB) {
        return Math.abs(lineEquationA.A * lineEquationB.A + lineEquationA.B * lineEquationB.B) <= Number.EPSILON;
    }
    static getPerpendicular(lineEquation, point) {
        const A = lineEquation.B;
        const B = - lineEquation.A;
        const C = - A * point.x - B * point.y;

        return new LineEquation(A, B, C);
    }
    static getIntersect(lineA, lineB) {
        const {A:A1, B:B1, C:C1} = lineA.equation;
        const {A:A2, B:B2, C:C2} = lineB.equation;
        const x = (B2*C1/B1 + C2) / ( B2*A1/B1 - A2);
        const y = lineA.calcY(x);

        return Point(x, y);
    }
    static isAlign(lineEquation, point) {
        return lineEquation.calc(point) === 0;
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
        return -(this[_B] * y + this[_C]) / this[_A];
    }
    calcY(x) {
        return -(this[_A] * x + this[_C]) / this[_B];
    }
}