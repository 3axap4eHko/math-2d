'use strict';

import { sqr, sqrt, sqredDiff, sqrtedSum, isBetween } from '../src/utils';

describe( 'utils test suite', () => {

    it( 'sqr', () => {
        expect( sqr( 0, 0 ) ).toEqual( 0 );
        expect( sqr( 1, 1 ) ).toEqual( 1 );
        expect( sqr( 2, 2 ) ).toEqual( 4 );
    } );
    it( 'sqrt', () => {
        expect( sqrt( 0 ) ).toEqual( 0 );
        expect( sqrt( 1 ) ).toEqual( 1 );
        expect( sqrt( 4 ) ).toEqual( 2 );
    } );
    it( 'sqredDiff', () => {
        expect( sqredDiff( 0, 0 ) ).toEqual( 0 );
        expect( sqredDiff( 1, 0 ) ).toEqual( 1 );
        expect( sqredDiff( 2, 0 ) ).toEqual( 4 );
        expect( sqredDiff( 2, 2 ) ).toEqual( 0 );
    } );
    it( 'sqrtedSum', () => {
        expect( sqrtedSum( 0, 0 ) ).toEqual( 0 );
        expect( sqrtedSum( 1, 0 ) ).toEqual( 1 );
        expect( sqrtedSum( 2, 2 ) ).toEqual( 2 );
        expect( sqrtedSum( 4, 5 ) ).toEqual( 3 );
    } );
    it( 'isBetween', () => {
        const a = 0;
        const b = 1;
        const c = 2;

        expect( isBetween( b, a, c ) ).toBeTruthy();
        expect( isBetween( a, b, c ) ).toBeFalsy();
        expect( isBetween( c, a, b ) ).toBeFalsy();
    } );

} );
