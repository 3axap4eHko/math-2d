'use strict';

import Point from '../src/Point';

describe('Point test suite', () => {
    it('Point constructor', () => {
        const point = new Point(0,0);
        expect(point.x).toEqual(0);
        expect(point.x).toEqual(1);
    });
});
