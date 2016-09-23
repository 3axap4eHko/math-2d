'use strict';

import Point from '../src/Point';
import Line from '../src/Line';
import LineSegment from '../src/LineSegment';
import Quadrilateral from '../src/Quadrilateral';

const pointA = new Point(0,0);
const pointB = new Point(0,3);
const pointC = new Point(3,4);
const pointD = new Point(0,4);

const sideAB = new LineSegment(pointA, pointB);
const sideBC = new LineSegment(pointB, pointC);
const sideCD = new LineSegment(pointC, pointD);
const sideDA = new LineSegment(pointD, pointA);

describe('Quadrilateral test suite', () => {
    it('constructor', () => {
        const quadrilateral = new Quadrilateral(pointA, pointB, pointC, pointD);
        expect(quadrilateral.perimeter).toEqual(sideAB.length + sideBC.length + sideCD.length + sideDA.length);
    });
});
