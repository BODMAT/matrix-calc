//https://medium.com/ringcentral-developers/how-to-extend-an-existing-typescript-class-ef2bfe4b6690
import { MyMatrix } from "./MatrixData.js";

declare module './MatrixData.js' {
    interface MyMatrix {
        add(other: MyMatrix): MyMatrix;
        multiply(other: MyMatrix): MyMatrix;
        getTransposedArray(): number[][];
        transponeMe(): void;
        calcDeterminant(): number;
    }
}

MyMatrix.prototype.add = function (other: MyMatrix): MyMatrix {
    if (this.Height !== other.Height || this.Width !== other.Width) {
        throw new Error('Матриці повинні бути однакового розміру');
    }

    const result: number[][] = [];
    for (let i = 0; i < this.Height; i++) {
        result[i] = [];
        for (let j = 0; j < this.Width; j++) {
            result[i][j] = this.get(i, j) + other.get(i, j);
        }
    }

    return new MyMatrix(result);
}

MyMatrix.prototype.multiply = function (other: MyMatrix): MyMatrix {
    if (this.Width !== other.Height) {
        throw new Error('Кількість стовпчиків першої матриці повинна дорівнювати кількості рядків другої матриці');
    }

    const result: number[][] = [];
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
}

MyMatrix.prototype.getTransposedArray = function (): number[][] {
    const transposed: number[][] = [];
    for (let j = 0; j < this.Width; j++) {
        transposed[j] = [];
        for (let i = 0; i < this.Height; i++) {
            transposed[j][i] = this.get(i, j);
        }
    }
    return transposed;
}

MyMatrix.prototype.transponeMe = function (): void {
    const transposedArray = this.getTransposedArray();
    this._data = transposedArray;
    this._determinant = null;
}

MyMatrix.prototype.calcDeterminant = function (): number {
    if (this._determinant !== null) {
        return this._determinant
    } else {
        if (this.Height !== this.Width) {
            throw new Error('Матриця повинна бути квадратною');
        }

        const size = this.Height;

        const matrixCopy: number[][] = [];
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

        determinant = Math.round(determinant * 100) / 100

        this._determinant = determinant;
        return determinant;
    }
}
export default MyMatrix;

//need "if" for both tests and browser, in one proj
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MyMatrix };
}