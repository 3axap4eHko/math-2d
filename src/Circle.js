'use strict';

import Point from './Point';
import LineSegment from './LineSegment';
import Line from './Line';
import {sqr, sqrt} from './utils';

const _Center = Symbol('Symbol');
const _Radius = Symbol('Radius');

export default class Circle {
    static getDistance(circle, point) {
        return Point.getDistance(circle.center, point);
    }
    static isAlign(circle, point) {
        return Point.getDistance(circle.center, point) <= circle.radius;
    }
    static areIntersect(circleA, circleB) {
        return Circle.getDistance(circleA, circleB.center) < circleA.radius + circleB.radius;
    }
    static getIntersect(circleA, circleB) {
        const result = [];
        const lineSegment = new LineSegment(circleA.center, circleB.center);
        const distance = circleA.radius + circleB.radius;
        if ( lineSegment.length > 0 && distance >= lineSegment.length ) {
            const a = (sqr(circleA.radius) - sqr(circleA.radius) + sqr(lineSegment.length)) / (2*lineSegment.length);
            const height = sqrt(sqr(circleA.radius)-sqr(a));
            const [point] = LineSegment.getPointsAtDistance(lineSegment, lineSegment.pointA, a);
            const x1 = point.x + height * LineSegment.getDY(lineSegment)/lineSegment.length;
            const y1 = point.y + height * LineSegment.getDX(lineSegment)/lineSegment.length;
            result.push( new Point(x1, y1) );
            if (distance !== lineSegment.length) {
                const x2 = point.x - height * LineSegment.getDY(lineSegment)/lineSegment.length;
                const y2 = point.y - height * LineSegment.getDX(lineSegment)/lineSegment.length;
                result.push( new Point(x2, y2) );
            }
        }
        return result;
    }
    static getSegment(circle, line) {
        const height = Line.getPerpendicular(line, circle.center);
        const d = sqrt( sqr(circle.radius) - sqr(height.length) );

        return Line.getPointsAtDistance(line, height.pointB, d);
    }
    constructor(center, radius) {
        this[_Center] = center;
        this[_Radius] = radius;
    }
    get radius() {
        return this[_Radius];
    }
    get center() {
        return this[_Center];
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