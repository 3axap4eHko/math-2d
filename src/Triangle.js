'use strict';

import Line from './Line';
import LineSegment from './LineSegment';
import Circle from './Circle';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _PointC = Symbol('pointC');
const _LineA  = Symbol('lineA');
const _LineB  = Symbol('lineB');
const _LineC  = Symbol('lineC');
const _AngleA  = Symbol('angleA');
const _AngleB  = Symbol('angleB');
const _AngleC  = Symbol('angleC');
const _Semiperimeter  = Symbol('semiperimeter');
const _OrthoCenter  = Symbol('orthoCenter');
const _CircumscribedCircleRadius  = Symbol('circumscribedCircleRadius');
const _InscribedCircleRadius  = Symbol('inscribedCircleRadius');
const _Area  = Symbol('area');

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

const vertexAlignLines = {
    A: [_LineC, _LineA],
    B: [_LineA, _LineB],
    C: [_LineB, _LineC],
};
/*
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
    static getCircumscribedCircle(triangle) {
        const {orthoCenter, circumscribedCircleRadius} = triangle;
        return new Circle(orthoCenter, circumscribedCircleRadius);
    }
    static getInscribedCircle(triangle) {
        const {orthoCenter, circumscribedCircleRadius} = triangle;
        return new Circle(orthoCenter, circumscribedCircleRadius);
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
        this[_AngleA] = Line.getAngle(...vertexAlignLines.A);
        this[_AngleB] = Line.getAngle(...vertexAlignLines.B);
        this[_AngleC] = Line.getAngle(...vertexAlignLines.C);
        this[_Semiperimeter] = (this[_LineA].length + this[_LineB].length + this[_LineC].length) / 2;
        const lineAp = Line.getPerpendicular(this[_LineA].line, this[_LineA].middle);
        const lineBp = Line.getPerpendicular(this[_LineB].line, this[_LineB].middle);
        this[_OrthoCenter] = Line.getIntersect(lineAp, lineBp);
        this[_CircumscribedCircleRadius] = this[_LineA].length / (2*Math.sin(this[_AngleA]));
        this[_Area] = this[_LineA].length*this[_LineB].length*this[_LineC].length / (4*this[_CircumscribedCircleRadius]);
        this[_InscribedCircleRadius] = this[_Area] / this[_Semiperimeter];
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
    get lineSegmentA() {
        return this[_LineA];
    }
    get lineSegmentB() {
        return this[_LineB];
    }
    get lineSegmentC() {
        return this[_LineC];
    }
    get angleA() {
        return this[_AngleA];
    }
    get angleB() {
        return this[_AngleB];
    }
    get angleC() {
        return this[_AngleC];
    }
    get orthoCenter() {
        return this[_OrthoCenter];
    }
    get circumscribedCircleRadius() {
        return this[_CircumscribedCircleRadius];
    }
    get inscribedCircleRadius() {
        return this[_InscribedCircleRadius];
    }
    get area() {
        return this[_Area];
    }
}

Triangle.VERTEX_A = 'A';
Triangle.VERTEX_B = 'B';
Triangle.VERTEX_C = 'C';

Triangle.SIDE_A = 'a';
Triangle.SIDE_B = 'b';
Triangle.SIDE_C = 'c';
