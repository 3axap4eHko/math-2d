'use strict';

import CircleEquation from './CircleEquation';

const _Center = Symbol('center');
const _Radius = Symbol('radius');
const _Equation = Symbol('equation');

export default class Circle {
    static getDistance(circleA, point) {
        return CircleEquation.getDistance(circleA.equation, point);
    }
    static isAlign(circle, point) {
        return CircleEquation.isAlign(circle.equation, point);
    }
    static areIntersect(circleA, circleB) {
        return CircleEquation.areIntersect(circleA.equation, circleB.equation);
    }
    static getIntersect(circleA, circleB) {
        return CircleEquation.getIntersect(circleA.equation, circleB.equation);
    }
    static getSegment(circle, line) {
        return CircleEquation.getSegment(circle.equation, line);
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