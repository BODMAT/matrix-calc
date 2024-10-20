//! JEST UNIT TESTS
let { MyMatrix } = require("../js/MatrixData.js");
describe("MatrixData UNIT tests", () => {

    let matrix1, matrix2, matrixArrStr, matrixStr;
    beforeEach(() => {
        matrix1 = new MyMatrix([[1, 2], [3, 4], [5, 6]]);
        matrix2 = new MyMatrix([[1, 0, 0, 0], [1, 0, 0, 1]]);
        matrixArrStr = new MyMatrix(["1 2 3 11", "4 5 6 22", "7 8 9 33"]);
        matrixStr = new MyMatrix("1 2  3\n4   5   6\n7 8 9");
    });

    test("Are there necessary methods", () => {
        expect(matrix1.toString()).toBeDefined();
        expect(matrix1.Width).toBeDefined();
        expect(matrix1.Height).toBeDefined();
        expect(matrix1.getHeight()).toBeDefined();
        expect(matrix1.getWidth()).toBeDefined();
    });

    test("Is matrix validation correct", () => {
        expect(matrix1.data).toEqual([[1, 2], [3, 4], [5, 6]])
        expect(matrix2.data).toEqual([[1, 0, 0, 0], [1, 0, 0, 1]])
        expect(matrixArrStr.data).toEqual([[1, 2, 3, 11], [4, 5, 6, 22], [7, 8, 9, 33]])
        expect(matrixStr.data).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    })

    test("Copy MyMatrix", () => {
        const matrixCopy = new MyMatrix(matrix1);
        expect(matrixCopy.data).toEqual([[1, 2], [3, 4], [5, 6]]);
        expect(matrix1.data).toEqual([[1, 2], [3, 4], [5, 6]]);
        matrix1.set(0, 0, 1000);
        expect(matrixCopy.data).toEqual([[1, 2], [3, 4], [5, 6]]);
        expect(matrix1.data).toEqual([[1000, 2], [3, 4], [5, 6]]);
    })

    test("Is set/get correct", () => {
        matrix1.set(0, 0, 999);
        expect(matrix1.get(0, 0)).toBe(999)
        matrix1.set(0, 0, 111);
        expect(matrix1.get(0, 0)).toBe(111)

        matrix1.data[0][0] = 999;
        expect(matrix1.get(0, 0)).toBe(999)
        matrix1.data[0][0] = 111;
        expect(matrix1.get(0, 0)).toBe(111)
    })

    test("Test set/get w incorect indexes", () => {
        expect(() => {
            matrix1.set(-12, 0, 999);
        }).toThrow(Error)
        expect(() => {
            matrix1.get(100, 0);
        }).toThrow(Error)
    })

    test("Test Width/Height, getWidth()/getHeight()", () => {
        expect(matrix2.Width).toBe(4)
        expect(matrix2.Height).toBe(2)
        expect(matrix2.getWidth()).toBe(4)
        expect(matrix2.getHeight()).toBe(2)
        matrix2.data = [[11, 2], [33, 4], [55, 6]]
        expect(matrix2.Width).toBe(2)
        expect(matrix2.Height).toBe(3)
        expect(matrix2.getWidth()).toBe(2)
        expect(matrix2.getHeight()).toBe(3)
    })

    test("Test toString()", () => {
        expect(`${matrix2}`).toEqual(`  1	  0	  0	  0
  1	  0	  0	  1`)
    })

    test("Test for err, w string in matrix", () => {
        expect(() => {
            const errMatrix = new MyMatrix("1 2     dc", "2 3   67");
        }).toThrow(Error)
    })
});