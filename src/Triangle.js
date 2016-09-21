'use strict';

import LineSegment from './LineSegment';
import Circle from './Circle';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _PointC = Symbol('pointC');
const _LineA  = Symbol('lineA');
const _LineB  = Symbol('lineB');
const _LineC  = Symbol('lineC');

const vertexes = {
    A: _PointA,
    B: _PointB,
    C: _PointC,
};

const vertexOppositeLine = {
    A: _LineB,
    B: _LineC,
    C: _LineA,
};
/*
const vertexAlignLines = {
    A: [LineC, LineA],
    B: [LineA, LineB],
    C: [LineB, LineC],
};

const lines = {
    a: LineA,
    b: LineB,
    c: LineC,
};

const lineOppositeVertex = {
    a: PointC,
    b: PointA,
    c: PointB,
};

const lineAlignVertex = {
    a: [PointA, PointB],
    b: [PointB, PointC],
    c: [PointC, PointA],
};
*/
function getVertex(triangle, vertex) {
    if (vertex in vertexes) {
        return triangle[vertexes[vertex]];
    }
    throw Error(`Unknown vertex name ${vertex} for ${Object.keys(vertexes)}`);
}

function getVertexOppositeLine(triangle, vertex) {
    if (vertex in vertexOppositeLine) {
        return triangle[vertexOppositeLine[vertex]];
    }
    throw Error(`Unknown vertex name ${vertex} for ${Object.keys(vertexOppositeLine)}`);
}

export default class Triangle {
    static getHeight(triangle, vertex) {
        const point = getVertex(triangle, vertex);
        const line = getVertexOppositeLine(triangle, vertex);
        return LineSegment.getPerpendicular(line, point);
    }
    static createFromLineAndLength(line, lengthA, lengthB) {
        const circleA = new Circle(line.pointA, lengthA);
        const circleB = new Circle(line.pointB, lengthB);
        const points = Circle.getIntersect(circleA, circleB);
        return points.map( point => new Triangle(line.pointA, line.pointA, point));
    }
    constructor(pointA, pointB, pointC) {
        this[_PointA] = pointA;
        this[_PointB] = pointB;
        this[_PointC] = pointC;
        this[_LineA]  = new LineSegment(pointA, pointB);
        this[_LineB]  = new LineSegment(pointB, pointC);
        this[_LineC]  = new LineSegment(pointC, pointA);
    }
    get pointA() {
        return this[_PointA];
    }
    get pointB() {
        return this[_PointB];
    }
    get pointC() {
        return this[_PointC];
    }
    get lineA() {
        return this[_LineA];
    }
    get lineB() {
        return this[_LineB];
    }
    get lineC() {
        return this[_LineC];
    }
}

Triangle.VERTEX_A = 'A';
Triangle.VERTEX_B = 'B';
Triangle.VERTEX_C = 'C';

Triangle.SIDE_A = 'a';
Triangle.SIDE_B = 'b';
Triangle.SIDE_C = 'c';
