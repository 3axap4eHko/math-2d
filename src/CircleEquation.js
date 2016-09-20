'use strict';

import Point from './Point';
import Line from './Line';
import LineEquation from './LineEquation';
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
        const result = [];
        const line = new Line(circleEquationA.center, circleEquationB.center);
        const distance = circleEquationA.radius + circleEquationB.radius;
        if ( line.length > 0 && distance >= line.length ) {
            const a = (sqr(circleEquationA.radius) - sqr(circleEquationA.radius) + sqr(line.length)) / (2*line.length);
            const height = sqrt(sqr(circleEquationA.radius)-sqr(a));
            const [point] = LineEquation
                .getPointsAtDistance(line.equation, line.pointA, a)
                .filter( p => Line.isAlign(line, p) );

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
    static getSegment(circleEquation, line) {
        const height = Line.getPerpendicular(line.equation, circleEquation.center);
        const d = sqrt( sqr(circleEquation.radius) - sqr(height.length) );

        return LineEquation.getPointsAtDistance(line.equation, height.pointB, d);
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