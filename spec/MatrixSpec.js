'use strict';

import Matrix from '../src/Matrix';

const testRow = [1,2,3,4,5];
const testColumn = [1,1,1,1,1];

describe('Quadrilateral test suite', () => {
    it('constructor', () => {
        const matrix = new Matrix([
            testRow,
            testRow,
            testRow,
            testRow,
            testRow,
        ]);
        expect(matrix.getRow(0)).toEqual(testRow);
        expect(matrix.getRows()[0]).toEqual(testRow);
        expect(matrix.getColumn(0)).toEqual(testColumn);
        expect(matrix.getColumns()[0]).toEqual(testColumn);
    });
});
