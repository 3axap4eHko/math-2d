'use strict';

import Point from './Point';
import {sqr, sqrt} from './utils';

const _Center = Symbol('Symbol');
const _Radius = Symbol('Radius');

export default class CircleEquation {
    static getDistance(circleEquation, point) {
        return Point.getDistance(circleEquation.center, point);
    }
    static isAlign(circleEquation, point) {
        return Point.getDistance(circleEquation.center, point) <= circleEquation.radius;
    }
    static areIntersect(circleEquationA, circleEquationB) {
        return CircleEquation.getDistance(circleEquationA, circleEquationB.center) < circleEquationA.radius + circleEquationB.radius;
    }
    static getIntersect(circleEquationA, circleEquationB) {
        // (x-x1)^2 + (y-y1)^2 = r1^2
        // x^2 - 2*x*x1 + x1^2 + y^2 - 2*y*y1 + y1^2 = r1^2
        // x^2 - 2*x*x2 + x2^2 + y^2 - 2*y*y2 + y2^2 = r2^2
        // -4*x*(x1-x2) + x1^2 - x2^2 - 4*y*(y1-y2) + y1^2 - y2^2 = r1^2 - r2^2
        // -4*x*(x1-x2) - 4*y*(y1-y2) + x1^2 - x2^2 + y1^2 - y2^2 = r1^2 - r2^2
        throw Error('Not implemented')
    }
    static getSegment(circleA, line) {
        throw Error('Not implemented')
    }
    constructor(center, radius) {
        this[_Center] = center;
        this[_Radius] = radius;
    }
    calc(point) {
        return Point.getDistance(this[_Center], point) - this[_Radius];
    }
    calcY(x) {
        const y = sqrt( sqr(this[_Radius]) - sqr(this[_Center].x - x) );
        return [
            new Point(x, this[_Center].y + y),
            new Point(x, this[_Center].y - y),
        ];
    }
    calcX(y) {
        const x = sqrt( sqr(this[_Radius]) - sqr(this[_Center].y - y) );
        return [
            new Point(this[_Center].x + x, y),
            new Point(this[_Center].x - x, y),
        ];
    }
}