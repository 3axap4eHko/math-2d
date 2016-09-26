'use strict';

import Point from '../src/Point';

describe('Point test suite', () => {
    it('constructor', () => {
        const x = Math.random();
        const y = Math.random();
        const point = new Point(x,y);
        expect(point.x).toEqual(x);
        expect(point.y).toEqual(y);
        expect(point.y).toEqual(y);
    });

    it('immutability', () => {
        const x = Math.random();
        const y = Math.random();
        const point = new Point(x,y);
        expect(() => point.x = 2).toThrowError();
        expect(() => point.y = 2).toThrowError();
    });

    it('areEqual', () => {
        const x = Math.random();
        const y = Math.random();
        const pointA = new Point(x,y);
        const pointB = new Point(x,y);
        const pointC = new Point(-1,-1);
        expect(Point.areEqual(pointA, pointB)).toBeTruthy();
        expect(Point.areEqual(pointA, pointC)).toBeFalsy();
        expect(Point.areEqual(pointB, pointC)).toBeFalsy();
    });

    it('isBetween', () => {
        const pointA = new Point(0,0);
        const pointB = new Point(1,1);
        const pointC = new Point(2,2);
        expect(Point.isBetween(pointB, pointA, pointC)).toBeTruthy();
        expect(Point.isBetween(pointA, pointB, pointC)).toBeFalsy();
        expect(Point.isBetween(pointC, pointA, pointB)).toBeFalsy();
    });

    it('getDistance', () => {
        const pointA = new Point(0,0);
        const pointB = new Point(0,3);
        const pointC = new Point(4,0);
        expect(Point.getDistance(pointA, pointB)).toEqual(3);
        expect(Point.getDistance(pointA, pointC)).toEqual(4);
        expect(Point.getDistance(pointB, pointC)).toEqual(5);
    });

    it('invert', () => {
        const pointA = new Point(1,1);
        const pointB = Point.invert(pointA);
        expect(pointB.x).toEqual(-1);
        expect(pointB.y).toEqual(-1);
    });

    it('add', () => {
        const pointA = new Point(1,1);
        const pointB = Point.invert(pointA);
        const pointC = Point.add(pointA, pointB);
        expect(pointC.x).toEqual(0);
        expect(pointC.y).toEqual(0);
    });

    it('scale', () => {
        const pointA = new Point(1,1);
        const pointB = Point.scale(pointA, 2);
        expect(pointB.x).toEqual(2);
        expect(pointB.y).toEqual(2);
    });

    it('rotate', () => {
        const pointA = new Point(1,1);
        const pointB = new Point(2,2);
        const pointC = Point.rotate(pointB, pointA, Math.PI);
        const pointE = new Point(0, 0);
        expect(Point.areEqual(pointC, pointE)).toBeTruthy();
    });

});
