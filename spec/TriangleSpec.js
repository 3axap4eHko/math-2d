'use strict';

import Point from '../src/Point';
import Line from '../src/Line';
import Triangle from '../src/Triangle';

const pointA = new Point(3,0);
const pointB = new Point(0,4);
const pointC = new Point(0,0);

describe('Triangle test suite', () => {
    it('constructor', () => {
        const triangle = new Triangle(pointA, pointB, pointC);
        expect(triangle.angleA).toEqual(Line.getAngle(triangle.sideCA.line, triangle.sideAB.line));
        expect(triangle.angleB).toEqual(Line.getAngle(triangle.sideAB.line, triangle.sideBC.line));
        expect(triangle.angleC).toEqual(Line.getAngle(triangle.sideBC.line, triangle.sideCA.line));
    });
});
