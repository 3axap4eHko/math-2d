'use strict';

import Point from '../src/Point';
import Circle from '../src/Circle';

const pointA = new Point(0,0);
const pointB = new Point(1,0);
const pointC = new Point(1,1);
const pointD = new Point(2,2);
const pointF = new Point(2,0);
const radius1 = 1;

describe('Circle test suite', () => {

    it('constructor', () => {
        const circle = new Circle(pointA, radius1);
        expect(circle.radius).toEqual(radius1);
        expect(Point.areEqual(circle.center, pointA)).toBeTruthy();
        expect(circle.area).toEqual(2 * Math.PI * radius1*radius1)
    });

    it('getDistance', () => {
        const circle = new Circle(pointA, radius1);
        expect(Circle.getDistance(circle, pointB)).toEqual(radius1);
    });

    it('isAlign', () => {
        const circle = new Circle(pointA, radius1);
        expect(Circle.isAlign(circle, pointB)).toBeTruthy();
        expect(Circle.isAlign(circle, pointC)).toBeFalsy();
    });

    it('areIntersect', () => {
        const circleA = new Circle(pointA, radius1);
        const circleB = new Circle(pointC, radius1);
        const circleC = new Circle(pointD, radius1);
        expect(Circle.areIntersect(circleA, circleB)).toBeTruthy();
        expect(Circle.areIntersect(circleB, circleC)).toBeTruthy();
        expect(Circle.areIntersect(circleA, circleC)).toBeFalsy();
    });

    it('getIntersect', () => {
        const circleA = new Circle(pointA, radius1);
        const circleB = new Circle(pointB, radius1);
        const circleC = new Circle(pointF, radius1);

        const intersectsA = Circle.getIntersect(circleA, circleB);
        expect(intersectsA.length).toEqual(2);
        intersectsA.forEach( point => expect(point.x).toEqual(radius1/2));

        const intersectsB = Circle.getIntersect(circleA, circleC);
        expect(intersectsB.length).toEqual(1);
    });

});
