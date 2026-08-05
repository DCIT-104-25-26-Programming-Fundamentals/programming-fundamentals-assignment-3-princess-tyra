// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function displayMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const rowStr = matrix[i].map(val => String(val).padStart(4, ' ')).join('');
        console.log(rowStr);
    }
}

function readMatrix(rows, cols, name) {
    if (name) {
        console.log(`For ${name}:`);
    }
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        let valid = false;
        let rowArr;
        while (!valid) {
            const line = readlineSync.question(`Enter row ${i + 1}: `);
            rowArr = line.trim().split(/\s+/).map(Number);
            if (rowArr.length === cols && rowArr.every(num => !isNaN(num))) {
                valid = true;
            } else {
                console.log(`Invalid input. Please enter exactly ${cols} space-separated numbers.`);
            }
        }
        matrix.push(rowArr);
    }
    return matrix;
}

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];
    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const result = [];
    for (let i = 0; i < rowsA; i++) {
        const newRow = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }
    return result;
}

function main() {
    console.log('--- PART A — Transpose a Matrix ---');
    const rowsA = readlineSync.questionInt('Enter number of rows: ');
    const colsA = readlineSync.questionInt('Enter number of columns: ');
    const matrixA = readMatrix(rowsA, colsA, 'Original Matrix');
    
    console.log('\nOriginal Matrix:');
    displayMatrix(matrixA);
    
    const transposed = transpose(matrixA);
    console.log('\nTransposed Matrix:');
    displayMatrix(transposed);

    console.log('\n--- PART B — Add Two Matrices ---');
    const rowsB = readlineSync.questionInt('Enter number of rows for the matrices: ');
    const colsB = readlineSync.questionInt('Enter number of columns for the matrices: ');
    const matB1 = readMatrix(rowsB, colsB, 'Matrix A');
    const matB2 = readMatrix(rowsB, colsB, 'Matrix B');
    
    console.log('\nMatrix A:');
    displayMatrix(matB1);
    console.log('\nMatrix B:');
    displayMatrix(matB2);
    
    const sumMat = addMatrices(matB1, matB2);
    console.log('\nSum Matrix (A + B):');
    displayMatrix(sumMat);

    console.log('\n--- PART C — Multiply Two Matrices ---');
    const rowsC1 = readlineSync.questionInt('Enter number of rows for Matrix A: ');
    const colsC1 = readlineSync.questionInt('Enter number of columns for Matrix A: ');
    const rowsC2 = readlineSync.questionInt('Enter number of rows for Matrix B (must equal Matrix A\'s columns): ');
    
    if (colsC1 !== rowsC2) {
        console.log('Error: Matrix A columns must equal Matrix B rows for multiplication.');
        return;
    }
    
    const colsC2 = readlineSync.questionInt('Enter number of columns for Matrix B: ');
    const matC1 = readMatrix(rowsC1, colsC1, 'Matrix A');
    const matC2 = readMatrix(rowsC2, colsC2, 'Matrix B');
    
    console.log('\nMatrix A:');
    displayMatrix(matC1);
    console.log('\nMatrix B:');
    displayMatrix(matC2);
    
    const prodMat = multiplyMatrices(matC1, matC2);
    console.log('\nProduct Matrix (A x B):');
    displayMatrix(prodMat);
}

main();
