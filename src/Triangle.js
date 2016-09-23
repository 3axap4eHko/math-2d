'use strict';

import Line from './Line';
import LineSegment from './LineSegment';
import Circle from './Circle';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _PointC = Symbol('pointC');

const _SideAB  = Symbol('sideAB');
const _SideBC  = Symbol('sideBC');
const _SideCA  = Symbol('sideCA');

const _AngleA  = Symbol('angleA');
const _AngleB  = Symbol('angleB');
const _AngleC  = Symbol('angleC');

const _Perimeter  = Symbol('perimeter');
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
    A: _SideBC,
    B: _SideCA,
    C: _SideAB,
};

const vertexAlignLines = {
    A: [_SideCA, _SideAB],
    B: [_SideAB, _SideBC],
    C: [_SideBC, _SideCA],
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

        this[_SideAB]  = new LineSegment(pointA, pointB);
        this[_SideBC]  = new LineSegment(pointB, pointC);
        this[_SideCA]  = new LineSegment(pointC, pointA);

        this[_AngleA] = Line.getAngle(...vertexAlignLines.A.map( key => this[key].line));
        this[_AngleB] = Line.getAngle(...vertexAlignLines.B.map( key => this[key].line));
        this[_AngleC] = Line.getAngle(...vertexAlignLines.C.map( key => this[key].line));

        this[_Perimeter] = this[_SideAB].length + this[_SideBC].length + this[_SideCA].length;
        this[_Semiperimeter] = this[_Perimeter] / 2;

        const lineAp = Line.getPerpendicular(this[_SideAB].line, this[_SideAB].middle);
        const lineBp = Line.getPerpendicular(this[_SideBC].line, this[_SideBC].middle);

        this[_OrthoCenter] = Line.getIntersect(lineAp, lineBp);
        this[_CircumscribedCircleRadius] = this[_SideAB].length / (2*Math.sin(this[_AngleA]));
        this[_Area] = this[_SideAB].length*this[_SideBC].length*this[_SideCA].length / (4*this[_CircumscribedCircleRadius]);
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
    get sideAB() {
        return this[_SideAB];
    }
    get sideBC() {
        return this[_SideBC];
    }
    get sideCA() {
        return this[_SideCA];
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
    get perimeter() {
        return this[_Perimeter];
    }
    get area() {
        return this[_Area];
    }
}

Triangle.VERTEX_A = 'A';
Triangle.VERTEX_B = 'B';
Triangle.VERTEX_C = 'C';
