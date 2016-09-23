'use strict';

import {pairs, reduce} from 'yyf-core/iterate';
import {pointToId} from './utils';

const _Height = Symbol('height');
const _Width = Symbol('width');
const _Matrix = Symbol('matrix');
const _Converter = Symbol('converter');


function getMaxLength(data) {
    return data.reduce( (max, row) => max < row.length ? row.length : max );
}

export default class Matrix {
    static add(matrix1, matrix2) {

    }
    static sub(matrix1, matrix2) {

    }
    static scale(matrix1, value) {

    }
    static mult(matrix1, value) {

    }
    constructor(data, converter = v => v) {
        this[_Height] = data.length;
        this[_Width] = getMaxLength(data);
        const matrix = {};
        data.forEach( (row, columnIdx) => {
            row.forEach( (value, rowIdx) => {
                matrix[`${rowIdx}:${columnIdx}`] = value;
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
    getRow(rowIdx) {
        const testRegexp = new RegExp(`:${rowIdx}$`);
        return pairs(this[_Matrix])
            .filter( ({key, value}) => testRegexp.test(key) )
            .map( pair => pair.value );
    }
    getRows() {
        return pairs(this[_Matrix])
            .map( ({key, value}) => ({key: key.split(':').map(Number), value}) )
            .sort( (pairA, pairB) => pairA.key[1] - pairB.key[1] )
            .reduce( (result, {key, value}) => {
            const [rowIdx, columnIdx] = key;
            if (!result[columnIdx]) {
                result[columnIdx] = [];
            }
            result[columnIdx][rowIdx] = value;
            return result;
        }, []);
    }
    getColumn(columnIdx) {
        const testRegexp = new RegExp(`^${columnIdx}:`);
        return pairs(this[_Matrix])
            .filter( ({key, value}) => testRegexp.test(key) )
            .map( pair => pair.value );
    }
    getColumns() {
        return pairs(this[_Matrix])
            .map( ({key, value}) => ({key: key.split(':').map(Number), value}) )
            .sort( (pairA, pairB) => pairA.key[0] - pairB.key[0] )
            .reduce( (result, {key, value}) => {
                const [rowIdx, columnIdx] = key;
                if (!result[rowIdx]) {
                    result[rowIdx] = [];
                }
                result[rowIdx][columnIdx] = value;
                return result;
            }, []);
    }
    getValue(row, column) {
        const key = `${row}:${column}`;
        return this[_Matrix][key];
    }
}