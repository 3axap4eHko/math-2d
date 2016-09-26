'use strict';

import Matrix from '../src/Matrix';

const testRow = [1,2,3,4,5];
const testColumn = [1,1,1,1,1];

describe('Matrix test suite', () => {
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
    it('forEach', () => {
        const matrix = new Matrix([
            testRow,
            testRow,
        ]);
        let counter = 0;
        Matrix.forEach(matrix, (value, rowIdx, columnIdx) => {
            expect(matrix.getValue(rowIdx, columnIdx)).toEqual(value);
            counter++;
        });
        expect(counter).toEqual(testRow.length*2);
    });
    it('map', () => {
        const matrix = new Matrix([
            testRow,
            testRow,
        ]);
        const mapper = (value, rowIdx, columnIdx) => {
            return Number(`${value}.${rowIdx}${columnIdx}1`);
        };
        const mappedMatrix = Matrix.map(matrix, mapper);
        expect(mappedMatrix.height).toEqual(matrix.height);
        expect(mappedMatrix.width).toEqual(matrix.width);
        Matrix.forEach(mappedMatrix, (value, rowIdx, columnIdx) => {
            expect(value).toEqual(mapper(matrix.getValue(rowIdx, columnIdx), rowIdx, columnIdx));
        });
    });
    it('every', () => {
        const matrix = new Matrix([
            testRow,
            testRow,
        ]);
        const falsy = Matrix.every(matrix, value => value < 5);
        expect(falsy).toBeFalsy();
        const truthy = Matrix.every(matrix, value => value != 6);
        expect(truthy).toBeTruthy();
    });
    it('some', () => {
        const matrix = new Matrix([
            testRow,
            testRow,
        ]);
        const truthy = Matrix.some(matrix, value => value < 5);
        expect(truthy).toBeTruthy();
        const falsy = Matrix.some(matrix, value => value === 6);
        expect(falsy).toBeFalsy();
    });

    it('areSame', () => {
        const matrix1 = new Matrix([
            [1,1,1],
            [1,1,1],
        ]);
        const matrix2 = new Matrix([
            [1,1],
            [1,1],
            [1,1],
        ]);
        expect(Matrix.areSame(matrix1, matrix2)).toBeFalsy();
        expect(Matrix.areSame(matrix1, matrix1)).toBeTruthy();
    });
    it('areEqual', () => {
        const matrix1 = new Matrix([
            [1,1,1],
            [1,1,1],
        ]);
        const matrix2 = new Matrix([
            [1,1],
            [1,1],
            [1,1],
        ]);
        const matrix3 = new Matrix([
            [1,1,1],
            [1,1,0],
        ]);
        expect(Matrix.areEqual(matrix1, matrix2)).toBeFalsy();
        expect(Matrix.areEqual(matrix1, matrix3)).toBeFalsy();
        expect(Matrix.areEqual(matrix1, matrix1)).toBeTruthy();
    });
    it('mult', () => {
        const matrix1 = new Matrix([
            [1,1,1,1],
            [1,1,1,1],
            [1,1,1,1],
        ]);
        const matrix2 = new Matrix([
            [1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1],
        ]);
        const resultMatrix = Matrix.mult(matrix1, matrix2);
        expect(resultMatrix.width).toEqual(matrix2.width);
        expect(resultMatrix.height).toEqual(matrix1.height);
        expect(Matrix.every(resultMatrix, value => value === 4)).toBeTruthy();
    });
    it('getTriangular', () => {
        const matrix = new Matrix([
            [1,2,3],
            [4,5,6],
            [7,8,10],
        ]);
        const triangularMatrix = Matrix.getTriangular(matrix);
        expect(triangularMatrix.getRows()).toEqual([ [ 1, 2, 3 ], [ 0, -0.75, -1.5 ], [ 0, 0, 0.125 ] ])
    });
    it('getDeterminant', () => {
        const matrix1 = new Matrix([
            [1,2,3],
            [4,5,6],
            [7,8,9],
        ]);
        const matrix2 = new Matrix([
            [1,2,3],
            [4,5,6],
            [7,8,10],
        ]);
        expect(Matrix.getDeterminant(matrix1) === 0).toBeTruthy();
        expect(Matrix.getDeterminant(matrix2)).toEqual(-0.09375);
    });
});
