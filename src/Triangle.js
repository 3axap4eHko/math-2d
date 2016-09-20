'use strict';

import Line from './Line';
import Circle from './Circle';

const PointA = Symbol('pointA');
const PointB = Symbol('pointB');
const PointC = Symbol('pointC');
const LineA  = Symbol('lineA');
const LineB  = Symbol('lineB');
const LineC  = Symbol('lineC');

const vertexes = {
    A: PointA,
    B: PointB,
    C: PointC,
};

const vertexOppositeLine = {
    A: LineB,
    B: LineC,
    C: LineA,
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
        return Line.getPerpendicular(line, point);
    }
    static createFromLineAndLength(line, lengthA, lengthB) {
        const circleA = new Circle(line.pointA, lengthA);
        const circleB = new Circle(line.pointB, lengthB);
        const points = Circle.getIntersect(circleA, circleB);
        return points.map( point => new Triangle(line.pointA, line.pointA, point));
    }
    constructor(pointA, pointB, pointC) {
        this[PointA] = pointA;
        this[PointB] = pointB;
        this[PointC] = pointC;
        this[LineA]  = new Line(pointA, pointB);
        this[LineB]  = new Line(pointB, pointC);
        this[LineC]  = new Line(pointC, pointA);
    }
    get pointA() {
        return this[PointA];
    }
    get pointB() {
        return this[PointB];
    }
    get pointC() {
        return this[PointC];
    }
    get lineA() {
        return this[LineA];
    }
    get lineB() {
        return this[LineB];
    }
    get lineC() {
        return this[LineC];
    }
}

Triangle.VERTEX_A = 'A';
Triangle.VERTEX_B = 'B';
Triangle.VERTEX_C = 'C';

Triangle.SIDE_A = 'a';
Triangle.SIDE_B = 'b';
Triangle.SIDE_C = 'c';
