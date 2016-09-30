'use strict';

import Point from '../Point';

const _Radius = Symbol('radius');
const _Direction = Symbol('direction');

export default class Cycloid {
    constructor(radius, direction) {
        this[_Radius] = radius;
        this[_Direction] = Point.getNormalized(direction);
    }
    getProgress(progress) {
        return new Point(
            this[_Radius]*progress - this[_Radius]*Math.sin(progress),
            this[_Radius] - this[_Radius]*Math.cos(progress),
        );
    }
}