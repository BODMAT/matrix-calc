import { MyMatrix } from "./MatrixData.js";
MyMatrix.prototype.add = function (other) {
    if (this.Height !== other.Height || this.Width !== other.Width) {
        throw new Error('Матриці повинні бути однакового розміру');
    }
    const result = [];
    for (let i = 0; i < this.Height; i++) {
        result[i] = [];
        for (let j = 0; j < this.Width; j++) {
            result[i][j] = this.get(i, j) + other.get(i, j);
        }
    }
    return new MyMatrix(result);
};
MyMatrix.prototype.multiply = function (other) {
    if (this.Width !== other.Height) {
        throw new Error('Кількість стовпчиків першої матриці повинна дорівнювати кількості рядків другої матриці');
    }
    const result = [];
    for (let i = 0; i < this.Height; i++) {
        result[i] = [];
        for (let j = 0; j < other.Width; j++) {
            let sum = 0;
            for (let k = 0; k < this.Width; k++) {
                sum += this.get(i, k) * other.get(k, j);
            }
            result[i][j] = sum;
        }
    }
    return new MyMatrix(result);
};
MyMatrix.prototype.getTransposedArray = function () {
    const transposed = [];
    for (let j = 0; j < this.Width; j++) {
        transposed[j] = [];
        for (let i = 0; i < this.Height; i++) {
            transposed[j][i] = this.get(i, j);
        }
    }
    return transposed;
};
MyMatrix.prototype.transponeMe = function () {
    const transposedArray = this.getTransposedArray();
    this._data = transposedArray;
    this._determinant = null;
};
MyMatrix.prototype.calcDeterminant = function () {
    if (this._determinant !== null) {
        return this._determinant;
    }
    else {
        if (this.Height !== this.Width) {
            throw new Error('Матриця повинна бути квадратною');
        }
        const size = this.Height;
        const matrixCopy = [];
        for (let i = 0; i < this.Height; i++) {
            matrixCopy[i] = [...this.data[i]];
        }
        let sign = 1;
        for (let i = 0; i < size; i++) {
            let maxIndex = i;
            for (let j = i + 1; j < size; j++) {
                if (Math.abs(matrixCopy[j][i]) > Math.abs(matrixCopy[maxIndex][i])) {
                    maxIndex = j;
                }
            }
            if (maxIndex !== i) {
                sign *= -1;
                [matrixCopy[i], matrixCopy[maxIndex]] = [matrixCopy[maxIndex], matrixCopy[i]];
            }
            if (matrixCopy[i][i] === 0) {
                throw new Error("Матриця сингулярна ( її визначник неможливо обчислити, і зазвичай таку матрицю вважають неінвертовною). Під час обчислення визначника відбувається ділення на нуль в такому випадку");
            }
            const factor = matrixCopy[i][i];
            for (let j = i + 1; j < size; j++) {
                const factor2 = matrixCopy[j][i] / factor;
                for (let k = i; k < size; k++) {
                    matrixCopy[j][k] -= factor2 * matrixCopy[i][k];
                }
            }
        }
        let determinant = sign;
        for (let i = 0; i < size; i++) {
            determinant *= matrixCopy[i][i];
        }
        determinant = Math.round(determinant * 100) / 100;
        this._determinant = determinant;
        return determinant;
    }
};
export default MyMatrix;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MyMatrix };
}
//# sourceMappingURL=MatrixOperations.js.map