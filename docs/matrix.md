# MATRIX

Matrix operations

### Dynamic methods and properties
``` javascript
import Matrix from 'math-2d/Matrix';

// creation matrix by rows, sign and converter
const matrix = new Matrix([
        [1,2,3,4,5],
        [6,7,8,9,10]
    ],
    -1,
    value => value % 10
);

// getting width of the matrix
matrix.width
// getting height of the matrix
matrix.height
// getting converter of the matrix
matrix.converter
// getting specific row of the matrix
matrix.getRow(rowIdx)
// getting an array of all rows of the matrix
matrix.getRows()
// getting specific column of the matrix
matrix.getColumn(columnIdx)
// getting an array of all columns of the matrix
matrix.getColumns()
// getting a value by row id and column id
matrix.getValue(rowIdx, columnIdx)
```

### Static methods and properties
``` javascript
import Matrix from 'math-2d/Matrix';

// iterate all elements of the matrix by callback(value, rowIdx, columnIdx)
Matrix.forEach(matrix, callback)
// map all elements of the matrix to new matrix by callback(value, rowIdx, columnIdx)
Matrix.map(matrix, callback)
// reduce all rows of the matrix to new matrix by callback(rows, rowIdx)
Matrix.mapRows(matrix, callback)
// reduce all elements of the matrix to new matrix by callback(result, value, rowIdx, columnIdx)
Matrix.reduce(matrix, callback, [init])
// returns true if all callback(value, rowIdx, columnIdx) results return true
Matrix.every(matrix, callback)
// returns true if at least one result of callback(value, rowIdx, columnIdx) returned true
Matrix.some(matrix, callback)
// returns true if matrix has the same size
Matrix.areSame(matrix1, matrix2)
// returns true if two matrix are equal
Matrix.areEqual(matrix1, matrix2)
// returns sum of matrix
Matrix.add(matrix1, matrix2)
// returns difference of matrix
Matrix.sub(matrix1, matrix2)
// returns scaled matrix
Matrix.scale(matrix, scale)
// returns scaled matrix by rows
Matrix.scaleRows(matrix, scales)
// returns result of matrix multiplication
Matrix.mult(matrix1, matrix2)
// returns transposed matrix
Matrix.getTransposedMatrix(matrix)
// returns upper triangular matrix representation
Matrix.getTriangularMatrix(matrix)
// returns matrix rank
Matrix.getRank(matrix)
// returns matrix determinant
Matrix.getDeterminant(matrix)
// solve matrix as linear equation by Cramer Rule
Matrix.solveByCramerRule(matrix)
```
