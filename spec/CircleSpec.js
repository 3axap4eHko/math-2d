'use strict';

import Point from '../src/Point';
import Line from '../src/Line';
import Circle from '../src/Circle';

const pointA = new Point(0,0);
const pointB = new Point(0,1);
const pointC = new Point(1,1);
const pointD = new Point(2,2);
const radius1 = 1;

describe('Circle test suite', () => {

    it('Circle constructor', () => {
        const circle = new Circle(pointA, radius1);
        expect(circle.radius).toEqual(radius1);
        expect(Point.areEqual(circle.center, pointA)).toBeTruthy();
    });

    it('Circle getDistance', () => {
        const circle = new Circle(pointA, radius1);
        expect(Circle.getDistance(circle, pointB)).toEqual(radius1);
    });

    it('Circle isAlign', () => {
        const circle = new Circle(pointA, radius1);
        expect(Circle.isAlign(circle, pointB)).toBeTruthy();
        expect(Circle.isAlign(circle, pointC)).toBeFalsy();
    });

    it('Circle areIntersect', () => {
        const circleA = new Circle(pointA, radius1);
        const circleB = new Circle(pointC, radius1);
        const circleC = new Circle(pointD, radius1);
        expect(Circle.areIntersect(circleA, circleB)).toBeTruthy();
        expect(Circle.areIntersect(circleB, circleC)).toBeTruthy();
        expect(Circle.areIntersect(circleA, circleC)).toBeFalsy();
    });

    it('Circle areIntersect', () => {
        const circleA = new Circle(pointA, radius1);
        const circleB = new Circle(pointB, radius1);
        const intersects = Circle.getIntersect(circleA, circleB);
        console.log(intersects.toString());
    });

});
