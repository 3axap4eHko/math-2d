'use strict';

import Point from './Point';
import {sqrt, sqr} from './utils';

const _A = Symbol('A');
const _B = Symbol('B');
const _C = Symbol('C');
const _Length = Symbol('Length');


export default class Line {
    static getDistance(line, point) {
        const m = line.calc(point);
        const n = line.length;
        return Math.abs(m / n);
    }
    static getAngle(lineA, lineB) {
        const m = lineA.A * lineB.B - lineA.B * lineB.A;
        const n = lineA.A * lineB.A + lineA.B * lineB.B;
        return Math.atan(m/n);
    }
    static areSame(lineA, lineB) {
        return lineA.A/lineB.A === lineA.B/lineB.B &&
            lineA.A/lineB.A === lineA.C/lineB.C;
    }
    static areParallel(lineA, lineB) {
        return Math.abs(lineA.A * lineB.B - lineA.B * lineB.A) <= Number.EPSILON;
    }
    static getPerpendicular(line, point) {
        const A = line.B;
        const B = - line.A;
        const C = - A * point.x - B * point.y;

        return new Line(A, B, C);
    }
    static arePerpendicular(lineA, lineB) {
        return Math.abs(lineA.A * lineB.A + lineA.B * lineB.B) <= Number.EPSILON;
    }
    static getIntersect(lineA, lineB) {
        const {A:A1, B:B1, C:C1} = lineA;
        const {A:A2, B:B2, C:C2} = lineB;
        const x = (C1*B2 - B1*C2) / (B1*A2 - A1*B2);
        const y = (A2*C1 - C2*A1) / (A1*B2 - A2*B1);
        return new Point(x, y);
    }
    static isAlign(line, point) {
        return line.calc(point) === 0;
    }
    static getClosestPointTo(line, point) {
        const {A, B, C} = line;
        const x = ( B*(B*point.x - A*point.y) - A*C) / (sqr(A) + sqr(B));
        const y = ( A*(A*point.y - B*point.x) - B*C) / (sqr(A) + sqr(B));

        return new Point(x, y);
    }
    static getPointsAtDistance(line, point, distance) {
        const {A, B, C} = line;
        const {A:Ap, B:Bp, C:Cp} = Line.getPerpendicular(line, point);

        const x1 = ( Bp*C - B*Cp + distance * B * sqrt( sqr(Ap) + sqr(Bp) ) ) / (B*Ap - Bp*A);
        const x2 = ( Bp*C - B*Cp - distance * B * sqrt( sqr(Ap) + sqr(Bp) ) ) / (B*Ap - Bp*A);

        const y1 = ( Ap*C - A*Cp + distance * A * sqrt( sqr(Ap) + sqr(Bp) ) ) / (A*Bp - Ap*B);
        const y2 = ( Ap*C - A*Cp - distance * A * sqrt( sqr(Ap) + sqr(Bp) ) ) / (A*Bp - Ap*B);


        return [
            new Point(x1, y1),
            new Point(x2, y2)
        ]
    }

    static createFromPoints(pointA, pointB) {
        const A = pointB.y - pointA.y;
        const B = pointA.x - pointB.x;
        const C = - pointA.x * A - pointA.y * B;

        return new Line(A, B, C);
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
    toObject() {
        return {
            A: this[_A],
            B: this[_B],
            C: this[_C],
        };
    }
}