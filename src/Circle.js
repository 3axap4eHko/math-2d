'use strict';

import Point from './Point';
import Line from './Line';
import LineEquation from './LineEquation';
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
        const line = new Line(circleA.center, circleB.center);
        const distance = circleA.radius + circleB.radius;
        if ( line.length > 0 && distance >= line.length ) {
            const a = (sqr(circleA.radius) - sqr(circleA.radius) + sqr(line.length)) / (2*line.length);
            const height = sqrt(sqr(circleA.radius)-sqr(a));
            const points = LineEquation
                .getPointsAtDistance(line.equation, line.pointA, a);

            const [point] = points.filter( p => Line.isAlign(line, p) );
            const x1 = point.x + height * Line.getDY(line)/line.length;
            const y1 = point.y + height * Line.getDX(line)/line.length;
            result.push( new Point(x1, y1) );
            if (distance !== line.length) {
                const x2 = point.x - height * Line.getDY(line)/line.length;
                const y2 = point.y - height * Line.getDX(line)/line.length;
                result.push( new Point(x2, y2) );
            }
        }
        return result;
    }
    static getSegment(circle, line) {
        const height = Line.getPerpendicular(line.equation, circle.center);
        const d = sqrt( sqr(circle.radius) - sqr(height.length) );

        return LineEquation.getPointsAtDistance(line.equation, height.pointB, d);
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