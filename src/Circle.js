'use strict';

import Point from './Point';
import CircleEquation from './CircleEquation';

const _Center = Symbol('center');
const _Radius = Symbol('radius');
const _Equation = Symbol('equation');

export default class Circle {
    static getDistance(circleA, point) {
        return Point.getDistance(circleA.center, point);
    }
    static isAlign(circle, point) {
        return Point.getDistance(circle.center, point) <= circle.radius;
    }
    static areIntersect(circleA, circleB) {
        return Circle.getDistance(circleA, circleB.center) < circleA.radius + circleB.radius;
    }
    static getIntersect(circleA, circleB) {
        throw Error('Not implemented')
    }
    static getSegment(circleA, line) {
        throw Error('Not implemented')
    }
    constructor(center, radius) {
        this[_Center] = center;
        this[_Radius] = radius;
        this[_Equation] = new CircleEquation(center, radius);
    }
    get center() {
        return this[_Center]
    }
    get radius() {
        return this[_Center]
    }
}