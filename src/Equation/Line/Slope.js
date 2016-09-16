'use strict';

import EquationLineCommon from './Common';

const K = Symbol('K');
const B = Symbol('B');

export default class Slope {
    constructor(pointA, pointB) {
        const common = new EquationLineCommon(pointA, pointB);
        this[K] = -common.A / common.B;
        this[B] = -common.C / common.B;
    }
    get k() {
        return this[K];
    }
    get b() {
        return this[B];
    }
    calc(point) {
        return this[K] * point.x + this[B] - point.y;
    }
    calcY(x) {
        return this[K] * x + this[B];
    }
    calcX(y) {
        return (y - this[B]) / this[K];
    }

}