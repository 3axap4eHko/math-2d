'use strict';

import {repeat, repeatWhile} from 'yyf-core/iterate';
import {pointToIdx} from './utils';

const _Height = Symbol('height');
const _Width = Symbol('width');
const _Sign = Symbol('sign');
const _Matrix = Symbol('matrix');
const _Converter = Symbol('converter');


function getMaxLength(data) {
    return data.reduce( (max, row) => max < row.length ? row.length : max, 0 );
}

function getLeadingZeroCount(row) {
    return row.reduce( (result, value, idx) => {
        if (value === 0 && result === idx) {
            return result + 1;
        }
        return result;
    }, 0);
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
            matrix.sign,
            matrix.converter
        )
    }
    static mapRows(matrix, callback) {
        return new Matrix(
            Array.from({length: matrix.height}).map( (_, y) => {
                return callback(matrix.getRow(y), y);
            }),
            matrix.sign,
            matrix.converter
        )
    }
    static mapColumns(matrix, callback) {
        const columns = matrix.getColumns().map(callback);
        const rows = Array.from({length: matrix.height}).map((_, rowIdx) => {
            return columns.map( (column, columnIdx) => column[rowIdx]);
        });
        return new Matrix(rows, matrix.sign, matrix.converter);
    }
    static reduce(matrix, callback, ...init) {
        return matrix.getRows().reduce( (result, row, rowIdx) => {
            return row.reduce( (reduced, value, colIdx) => {
                return callback(reduced, value, rowIdx, colIdx);
            }, result);
        }, ...init)
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
                matrix1.sign === matrix2.sign &&
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
    static scale(matrix, scale) {
        return Matrix.map(matrix, value => value * scale);

    }
    static scaleRows(matrix, scales) {
        return Matrix.map(matrix, (value, rowIdx) => value * scales[rowIdx]);

    }
    static scaleColumns(matrix, scales) {
        return Matrix.map(matrix, (value, _, columnIdx) => value * scales[columnIdx]);

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
        return new Matrix(data, matrix1.sign, matrix1.converter);
    }
    static getTransposedMatrix(matrix) {
        return new Matrix(matrix.getColumns(), matrix.sign, matrix.converter);
    }
    static getTriangularMatrix(matrix) {
        const rows = matrix.getRows();
        let sign = matrix.sign;
        const triangularRows = rows.reduce( (result, _, mapRowIdx) => {
            const mapRow = result[mapRowIdx];
            const mapValue = mapRow[mapRowIdx];
            return result.map( (row, rowIdx) => {
                if (row[mapRowIdx] === 0 || rowIdx <= mapRowIdx) {
                    return row;
                }
                const coefficient = - row[mapRowIdx] / mapValue;
                return row.map( (value, colIdx) => {
                    return value + mapRow[colIdx] * coefficient;
                })
            }).sort( (rowA, rowB) => {
                const order = getLeadingZeroCount(rowA) - getLeadingZeroCount(rowB);
                if (order > 0) {
                    sign = -sign;
                }
                return order;
            });
        }, rows);
        return new Matrix(triangularRows, sign, matrix.converter);
    }
    static getRank(matrix) {
        const triangularMatrix = Matrix.getTriangularMatrix(matrix);
        return triangularMatrix.getRows().reduce( (result, row) => {
            return result + row.some( value => value !== 0)
        },0)
    }
    static getDeterminant(matrix) {
        const triangularMatrix = Matrix.getTriangularMatrix(matrix);
        const rows = triangularMatrix.getRows();
        return rows
            .map( (rows, idx) => rows[idx] )
            .reduce( (result, value) => result * value ) * triangularMatrix.sign;
    }
    static solveByCramerRule(matrix, values) {
        const determinant = Matrix.getDeterminant(matrix);
        return Array.from({length: matrix.width}).map( (_, mapColumnIdx) => {
            const cramerMatrix = Matrix.mapColumns(matrix, (column, columnIdx) => mapColumnIdx === columnIdx ? values : column);
            const cramerDeterminant = Matrix.getDeterminant(cramerMatrix);

            return cramerDeterminant / determinant;
        });
    }
    constructor(data, sign = 1, converter = v => v) {
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
        this[_Sign] = sign;
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
    get sign() {
        return this[_Sign];
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