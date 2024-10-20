export class MyMatrix {
    protected _determinant: number | null = null;
    protected _data: number[][];

    constructor(data: MyMatrix | number[][] | string[] | string) {
        if (data instanceof MyMatrix) {
            this._data = [...data.data.map(row => [...row])];
        } else if (Array.isArray(data) && this.isRectangularNumsMatrix(data as number[][])) {
            this._data = data as number[][];
        } else if (Array.isArray(data) && this.isRectangularArrOfStrsMatrix(data as string[])) {
            this._data = data.map(row => row.split(" ").map(Number));
            this.validateMatrixData(this._data);
        } else if (typeof data === "string" && this.isRectangularStrMatrix(data)) {
            this._data = data.trim().split("\n").map(row => row.split(/\s+/).map(Number));
            this.validateMatrixData(this._data);
        } else {
            throw new Error('Некоректний запис конструктора');
        }
    }

    //mthds for constructor
    private isRectangularNumsMatrix(matrix: number[][]): boolean {
        if (!matrix.every(row => Array.isArray(row))) {
            return false;
        }

        const firstRowLength = matrix[0].length;
        return matrix.every(row => row.length === firstRowLength && row.every(val => typeof val === 'number'));
    }

    private isRectangularArrOfStrsMatrix(matrix: string[]): boolean {
        if (!matrix.every(row => typeof row === 'string')) {
            return false;
        }

        const firstRowLength = matrix[0].split(" ").length;
        return matrix.every(row => row.split(" ").length === firstRowLength);
    }

    private isRectangularStrMatrix(matrixStr: string): boolean {
        const rows = matrixStr.trim().split("\n").map(row => row.split(/\s+/));
        const firstRowLength = rows[0].length;

        return rows.every(row => row.length === firstRowLength);
    }

    private validateMatrixData(matrix: number[][]): void {
        if (matrix.some(row => row.some(val => isNaN(val)))) {
            throw new Error('Матриця повинна містити тільки числа');
        }
    }

    //others by me (also work as indexators)
    get data(): number[][] {
        return this._data;
    }
    set data(newData: number[][]) {
        if (!this.isRectangularNumsMatrix(newData)) {
            throw new Error('Некоректні дані');
        }
        this._data = newData;
        this._determinant = null;
    }

    //others by tasks
    get Height(): number {
        return this._data.length;
    }

    get Width(): number {
        return this._data[0].length;
    }

    public getHeight(): number {
        return this.Height
    }

    public getWidth(): number {
        return this.Width
    }

    public get(index: number, jndex: number): number {
        if (index < 0 || index >= this.Height || jndex < 0 || jndex >= this.Width) {
            throw new Error('Індекс поза межами');
        }
        return this._data[index][jndex];
    }

    public set(index: number, jndex: number, value: number): void {
        if (index < 0 || index >= this.Height || jndex < 0 || jndex >= this.Width) {
            throw new Error('Індекс поза межами');
        }
        this._data[index][jndex] = value;
        this._determinant = null;
    }

    public toString(): string {
        return this._data.map(row => row.map(val => val.toString().padStart(3)).join('\t')).join('\n');
    }

    //for determinant
    public get determinant(): number {
        return this._determinant = this.calcDeterminant();
    }
}

//need "if" for both tests and browser, in one proj
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MyMatrix };
}
