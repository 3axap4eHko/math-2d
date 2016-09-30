'use strict';

import Point from '../Point';

const _Asymptote = Symbol('asymptote');

export default class Spiral {
    constructor(asymptote) {
        this[_Asymptote] = asymptote;
    }
    getProgress(progress) {
        return new Point(
            this[_Asymptote]*progress*Math.cos(progress),
            this[_Asymptote]*progress*Math.sin(progress),
        );
    }
}