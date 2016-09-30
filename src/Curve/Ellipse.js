'use strict';

import Point from '../Point';

const _SemiMajorAxis = Symbol('semiMajorAxis');
const _SemiMinorAxis = Symbol('semiMinorAxis');

export default class Ellipse {
    constructor(a, b) {
        this[_SemiMajorAxis] = a;
        this[_SemiMinorAxis] = b;
    }
    getProgress(progress) {
        return new Point(
            this[_SemiMajorAxis]*Math.cos(progress),
            this[_SemiMinorAxis]*Math.sin(progress),
        );
    }
}