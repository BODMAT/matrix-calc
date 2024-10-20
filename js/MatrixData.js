export class MyMatrix {
    _determinant = null;
    _data;
    constructor(data) {
        if (data instanceof MyMatrix) {
            this._data = [...data.data.map(row => [...row])];
        }
        else if (Array.isArray(data) && this.isRectangularNumsMatrix(data)) {
            this._data = data;
        }
        else if (Array.isArray(data) && this.isRectangularArrOfStrsMatrix(data)) {
            this._data = data.map(row => row.split(" ").map(Number));
            this.validateMatrixData(this._data);
        }
        else if (typeof data === "string" && this.isRectangularStrMatrix(data)) {
            this._data = data.trim().split("\n").map(row => row.split(/\s+/).map(Number));
            this.validateMatrixData(this._data);
        }
        else {
            throw new Error('Некоректний запис конструктора');
        }
    }
    isRectangularNumsMatrix(matrix) {
        if (!matrix.every(row => Array.isArray(row))) {
            return false;
        }
        const firstRowLength = matrix[0].length;
        return matrix.every(row => row.length === firstRowLength && row.every(val => typeof val === 'number'));
    }
    isRectangularArrOfStrsMatrix(matrix) {
        if (!matrix.every(row => typeof row === 'string')) {
            return false;
        }
        const firstRowLength = matrix[0].split(" ").length;
        return matrix.every(row => row.split(" ").length === firstRowLength);
    }
    isRectangularStrMatrix(matrixStr) {
        const rows = matrixStr.trim().split("\n").map(row => row.split(/\s+/));
        const firstRowLength = rows[0].length;
        return rows.every(row => row.length === firstRowLength);
    }
    validateMatrixData(matrix) {
        if (matrix.some(row => row.some(val => isNaN(val)))) {
            throw new Error('Матриця повинна містити тільки числа');
        }
    }
    get data() {
        return this._data;
    }
    set data(newData) {
        if (!this.isRectangularNumsMatrix(newData)) {
            throw new Error('Некоректні дані');
        }
        this._data = newData;
        this._determinant = null;
    }
    get Height() {
        return this._data.length;
    }
    get Width() {
        return this._data[0].length;
    }
    getHeight() {
        return this.Height;
    }
    getWidth() {
        return this.Width;
    }
    get(index, jndex) {
        if (index < 0 || index >= this.Height || jndex < 0 || jndex >= this.Width) {
            throw new Error('Індекс поза межами');
        }
        return this._data[index][jndex];
    }
    set(index, jndex, value) {
        if (index < 0 || index >= this.Height || jndex < 0 || jndex >= this.Width) {
            throw new Error('Індекс поза межами');
        }
        this._data[index][jndex] = value;
        this._determinant = null;
    }
    toString() {
        return this._data.map(row => row.map(val => val.toString().padStart(3)).join('\t')).join('\n');
    }
    get determinant() {
        return this._determinant = this.calcDeterminant();
    }
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MyMatrix };
}
//# sourceMappingURL=MatrixData.js.map