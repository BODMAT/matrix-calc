//! JEST UNIT TESTS
let { MyMatrix } = require("../js/MatrixOperations.js");

describe("MatrixOperations UNIT tests", () => {

    let matrix1, matrix2, matrix3, matrixArrStr, matrixStr;
    beforeEach(() => {
        matrix1 = new MyMatrix([[1, 2, 12], [3, 4, 12], [5, 6, 12]]);
        matrix2 = new MyMatrix([[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 1]]);
        matrix3 = new MyMatrix([[1, 2, 3, 4], [5, 6, 7, 8]]);
        matrixArrStr = new MyMatrix(["1 2 3 11", "4 5 6 22", "7 8 9 33"]);
        matrixStr = new MyMatrix("1 2  3\n4   5   6\n7 8 9");
    });

    test("Are there necessary methods", () => {
        expect(matrix1.add(matrix1)).toBeDefined();
        expect(matrix1.multiply(matrix2)).toBeDefined();
        expect(matrix1.getTransposedArray()).toBeDefined();
    });

    test("Add", () => {
        expect(matrix1.add(matrix1).data).toEqual([[2, 4, 24], [6, 8, 24], [10, 12, 24]])
    })

    test("Mult", () => {
        expect(matrix1.multiply(matrix2).data).toEqual([[15, 12, 12, 14], [19, 12, 12, 16], [23, 12, 12, 18]])
        expect(() => {
            matrix2.multiply(matrix2)
        }).toThrow(Error)
    })

    test("Transposing", () => {
        expect(matrix1.getTransposedArray()).toEqual([[1, 3, 5], [2, 4, 6], [12, 12, 12]])
        expect(matrix3.getTransposedArray()).toEqual([[1, 5], [2, 6], [3, 7], [4, 8]])
    })

    test("TransposeMe", () => {
        expect(matrix3.Height).toBe(2)
        expect(matrix3.Width).toBe(4)
        matrix3.transponeMe()
        expect(matrix3.data).toEqual([[1, 5], [2, 6], [3, 7], [4, 8]])
        expect(matrix3.Height).toBe(4)
        expect(matrix3.Width).toBe(2)
    })

    test("Determinant", () => {
        expect(Math.round(matrix1.determinant * 100) / 100).toBeCloseTo(0, 2);
        matrix1.set(0, 2, 11);
        expect(Math.round(matrix1.determinant * 100) / 100).toBeCloseTo(2, 2);

        matrix1.transponeMe()
        expect(Math.round(matrix1.determinant * 100) / 100).toBeCloseTo(2, 2);

        matrix1.set(2, 1, 11);
        expect(Math.round(matrix1.determinant * 100) / 100).toBeCloseTo(-2, 2);
    })
})