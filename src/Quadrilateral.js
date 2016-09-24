'use strict';

import Line from './Line';
import LineSegment from './LineSegment';
import {sqrt} from './utils';

const _PointA = Symbol('pointA');
const _PointB = Symbol('pointB');
const _PointC = Symbol('pointC');
const _PointD = Symbol('pointD');

const _SideAB = Symbol('sideAB');
const _SideBC = Symbol('sideBC');
const _SideCD = Symbol('sideCD');
const _SideDA = Symbol('sideDA');

const _AngleA = Symbol('angleA');
const _AngleB = Symbol('angleB');
const _AngleC = Symbol('angleC');
const _AngleD = Symbol('angleD');

const _DiagonalAC = Symbol('diagonalAC');
const _DiagonalBD = Symbol('diagonalBD');

const _BimedianHG = Symbol('bimedianHG');
const _BimedianIJ = Symbol('bimedianIJ');

const _VertexCentroid = Symbol('vertexCentroid');


const _Perimeter  = Symbol('perimeter');
const _Semiperimeter  = Symbol('semiperimeter');
const _CircumscribedCircleRadius  = Symbol('circumscribedCircleRadius');
const _InscribedCircleRadius  = Symbol('inscribedCircleRadius');
const _Area  = Symbol('area');


export default class Quadrilateral {

    static hasInscribedCircle(quadrilateral) {
        return quadrilateral.sideAB.length + quadrilateral.sideCD.length === quadrilateral.sideBC.length + quadrilateral.sideDA.length;
    }
    constructor(pointA, pointB, pointC, pointD) {
        this[_PointA] = pointA;
        this[_PointB] = pointB;
        this[_PointC] = pointC;
        this[_PointD] = pointD;

        this[_SideAB] = new LineSegment(pointA, pointB);
        this[_SideBC] = new LineSegment(pointB, pointC);
        this[_SideCD] = new LineSegment(pointC, pointD);
        this[_SideDA] = new LineSegment(pointD, pointA);

        this[_AngleA] = Line.getAngle(this[_SideDA].line, this[_SideAB].line);
        this[_AngleB] = Line.getAngle(this[_SideAB].line, this[_SideBC].line);
        this[_AngleC] = Line.getAngle(this[_SideBC].line, this[_SideCD].line);
        this[_AngleD] = Line.getAngle(this[_SideCD].line, this[_SideDA].line);

        this[_DiagonalAC] = new LineSegment(pointA, pointC);
        this[_DiagonalBD] = new LineSegment(pointB, pointD);

        this[_BimedianHG] = new LineSegment(this[_SideAB].middle, this[_SideCD].middle);
        this[_BimedianIJ] = new LineSegment(this[_SideBC].middle, this[_SideDA].middle);

        this[_VertexCentroid] = Line.getIntersect(this[_BimedianHG].line, this[_BimedianIJ].line);

        const a = this[_SideAB].length;
        const b = this[_SideBC].length;
        const c = this[_SideCD].length;
        const d = this[_SideDA].length;

        this[_Perimeter] = a + b + c + d;
        this[_Semiperimeter] = this[_Perimeter] / 2;

        const p = this[_Semiperimeter];
        const lineHI = new LineSegment(this[_SideAB].middle, this[_SideBC].middle);
        this[_Area] = 2 * Line.getDistance(lineHI.line, this[_SideCD].middle) * lineHI.length;
        this[_CircumscribedCircleRadius] = 1/4 * sqrt( (( a*b + c*d)*(a*d + b*c)*(a*c + b*d))/((p - a)*(p - b)*(p - c)*(p - d)) );
        this[_InscribedCircleRadius] = Line.getDistance(this[_SideAB].line, this[_VertexCentroid]);
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
    get pointD() {
        return this[_PointD];
    }

    get sideAB() {
        return this[_SideAB];
    }
    get sideBC() {
        return this[_SideBC];
    }
    get sideCD() {
        return this[_SideCD];
    }
    get sideDA() {
        return this[_SideDA];
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
    get angleD() {
        return this[_AngleD];
    }

    get diagonalAC() {
        return this[_DiagonalAC];
    }
    get diagonalBD() {
        return this[_DiagonalBD];
    }
    get area() {
        return this[_Area];
    }
    get perimeter() {
        return this[_Perimeter];
    }
    get circumscribedCircleRadius() {
        return this[_CircumscribedCircleRadius];
    }
}

Quadrilateral.VERTEX_A = 'A';
Quadrilateral.VERTEX_B = 'B';
Quadrilateral.VERTEX_C = 'C';
Quadrilateral.VERTEX_D = 'D';