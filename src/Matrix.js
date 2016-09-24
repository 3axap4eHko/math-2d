'use strict';

import {repeat, repeatWhile} from 'yyf-core/iterate';
import {pointToIdx} from './utils';

const _Height = Symbol('height');
const _Width = Symbol('width');
const _Matrix = Symbol('matrix');
const _Converter = Symbol('converter');


function getMaxLength(data) {
    return data.reduce( (max, row) => max < row.length ? row.length : max, 0 );
}

export default class Matrix {
    static forEach(matrix, callback) {
        repeat(matrix.height, y => {
            repeat(matrix.width, x => {
                callback(matrix.getValue(y, x), y, x);
            });
        })
    }
    static map(matrix, callback) {
        return new Matrix(
            Array.from({length: matrix.height}).map( (_, y) => {
                return Array.from({length: matrix.width}).map( (_, x) => {
                    return callback(matrix.getValue(y, x), y, x);
                });
            }),
            matrix.converter
        )
    }
    static every(matrix, callback) {
        let result = true;
        repeatWhile(matrix.height, rowIdx => {
            repeatWhile(matrix.width, columnIdx => {
                return result = callback(matrix.getValue(rowIdx, columnIdx), rowIdx, columnIdx);
            });
            return result;
        });
        return result;
    }
    static some(matrix, callback) {
        let result = true;
        repeatWhile(matrix.height, rowIdx => {
            repeatWhile(matrix.width, columnIdx => {
                return result = !callback(matrix.getValue(rowIdx, columnIdx), rowIdx, columnIdx);
            });
            return result;
        });
        return !result;
    }
    static areSame(matrix1, matrix2) {
        return matrix1.width === matrix2.width &&
            matrix1.height === matrix2.height;
    }
    static areEqual(matrix1, matrix2) {
        return Matrix.areSame(matrix1, matrix2) &&
                Matrix.every(matrix1, (value, rowIdx, columnIdx) => value === matrix2.getValue(rowIdx, columnIdx));
    }
    static add(matrix1, matrix2) {
        if (matrix1.width !== matrix2.width ||
            matrix1.height !== matrix2.height) {
            throw new Error('Matrix should have the same size');
        }
        return Matrix.map(matrix1, (value, rowIdx, columnIdx) => {
            return value + matrix2.getValue(rowIdx, columnIdx);
        });
    }
    static sub(matrix1, matrix2) {
        if (matrix1.width !== matrix2.width ||
            matrix1.height !== matrix2.height) {
            throw new Error('Matrix should have the same size');
        }
        return Matrix.map(matrix1, (value, rowIdx, columnIdx) => {
            return value - matrix2.getValue(rowIdx, columnIdx);
        });
    }
    static scale(matrix1, scale) {
        return Matrix.map(matrix1, value => value * scale);

    }
    static mult(matrix1, matrix2) {
        if (matrix1.width !== matrix2.height) {
            throw new Error('Width of the first matrix is not equal to height of the second one');
        }
        const height = matrix1.height;
        const width = matrix2.width;
        const data = Array.from({length: height}).map( (_, y) => {
            const row = matrix1.getRow(y);
            return Array.from({length: width}).map( (_, x) => {
                return row.reduce( (result, value, id) => {
                    return result + value*matrix2.getValue(id, x);
                }, 0)
            });
        });
        return new Matrix(data, matrix1.converter);
    }
    constructor(data, converter = v => v) {
        const width = getMaxLength(data);

        this[_Height] = data.length;
        this[_Width] = width;

        const matrix = [];
        data.forEach( (row, y) => {
            row.forEach( (value, x) => {
                const idx = pointToIdx(x, y, width);
                matrix[idx] = { y, x, value: converter(value) };
            });
        });
        this[_Matrix] = matrix;
        this[_Converter] = converter;
    }
    get width() {
        return this[_Width];
    }
    get height() {
        return this[_Height];
    }
    get converter() {
        return this[_Converter];
    }
    getRow(rowIdx) {
        return this[_Matrix]
            .filter( data => data.y === rowIdx )
            .map( data => data.value );
    }
    getRows() {
        return this[_Matrix]
            .reduce( (result, {x, y, value}) => {
                if (!result[y]) {
                    result[y] = [];
                }
                result[y][x] = value;
                return result;
            }, []);
    }
    getColumn(columnIdx) {
        return this[_Matrix]
            .filter( data => data.x === columnIdx )
            .map( data => data.value );
    }
    getColumns() {
        return this[_Matrix]
            .reduce( (result, {x, y, value}) => {
                if (!result[x]) {
                    result[x] = [];
                }
                result[x][y] = value;
                return result;
            }, []);
    }
    getValue(rowIdx, columnIdx) {
        const idx = pointToIdx(columnIdx, rowIdx, this[_Width]);
        const data = this[_Matrix][idx];
        if(!data) {
            throw new Error(`Invalid matrix index ${rowIdx}:${columnIdx}`);
        }
        return data.value;
    }
}