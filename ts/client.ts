import MyMatrix from "./MatrixOperations.js";

const MAXCOLUMNS = 7;

const add: HTMLButtonElement = document.querySelector(".add")
const multiply: HTMLButtonElement = document.querySelector(".multiply")
const transponed: HTMLButtonElement = document.querySelector(".transponed")
const determinate: HTMLButtonElement = document.querySelector(".determinate")

const addColumn1: HTMLButtonElement = document.querySelector(".addColumn1")
const addRow1: HTMLButtonElement = document.querySelector(".addRow1")
const addColumn2: HTMLButtonElement = document.querySelector(".addColumn2")
const addRow2: HTMLButtonElement = document.querySelector(".addRow2")

const removeColumn1: HTMLButtonElement = document.querySelector(".removeColumn1")
const removeRow1: HTMLButtonElement = document.querySelector(".removeRow1")
const removeColumn2: HTMLButtonElement = document.querySelector(".removeColumn2")
const removeRow2: HTMLButtonElement = document.querySelector(".removeRow2")

const clear: HTMLButtonElement = document.querySelector(".clear")

function addRow(matrixClass: string) {
    const position: HTMLDivElement = document.querySelector(matrixClass);
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell");
    let str = `<div class="row">`;

    elNum.forEach(() => {
        str += `<input type="text" class="matrix-cell">`;
    });

    str += `</div>`;
    position.insertAdjacentHTML("beforeend", str);
}

function addColumn(matrixClass: string) {
    const position: HTMLDivElement = document.querySelector(matrixClass);
    const rows = position.querySelectorAll(".row");
    const numOfColumns: number = rows[0].querySelectorAll(".matrix-cell").length;
    for (let i = 0; i < rows.length && numOfColumns <= MAXCOLUMNS; i++) {
        let row = rows[i];
        row.insertAdjacentHTML("beforeend", `<input type="text" class="matrix-cell">`);

    }
}

function removeRow(matrixClass: string) {
    const position: HTMLDivElement = document.querySelector(matrixClass);
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
}

function removeColumn(matrixClass: string) {
    const position: HTMLDivElement = document.querySelector(matrixClass);
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        const cells = row.querySelectorAll(".matrix-cell");
        if (cells.length > 1) {
            row.removeChild(cells[cells.length - 1]);
        }
    });
}

addRow1.addEventListener("click", () => addRow(".matrix1"));
addRow2.addEventListener("click", () => addRow(".matrix2"));

addColumn1.addEventListener("click", () => addColumn(".matrix1"));
addColumn2.addEventListener("click", () => addColumn(".matrix2"));

removeRow1.addEventListener("click", () => removeRow(".matrix1"));
removeRow2.addEventListener("click", () => removeRow(".matrix2"));

removeColumn1.addEventListener("click", () => removeColumn(".matrix1"));
removeColumn2.addEventListener("click", () => removeColumn(".matrix2"));

clear.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".matrix-cell");
    inputs.forEach((input: HTMLInputElement) => {
        input.value = "";
    });
});

// Функція перетворення вхідних даних в об'єкт MyMatrix
function makeMyMatrixFromInputs(matrix: HTMLDivElement): MyMatrix {
    if (!!matrix.querySelector(".matrix-cell")) {
        let inputs = Array.from(matrix.querySelectorAll(".matrix-cell")) as HTMLInputElement[];
        let width = matrix.querySelector(".row")?.querySelectorAll(".matrix-cell")?.length || 0;
        let height = matrix.querySelectorAll(".row")?.length || 0;

        if (width === 0 || height === 0) {
            throw new Error("Matrix is empty");
        }

        let matrixArray: number[][] = [];
        for (let i = 0; i < height; i++) {
            let rowArray: number[] = [];
            for (let j = 0; j < width; j++) {
                let index = i * width + j;
                rowArray.push(parseFloat(inputs[index].value));
            }
            matrixArray.push(rowArray);
        }
        return new MyMatrix(matrixArray);
    } else {
        return new MyMatrix(matrix.textContent.replace(/<br\s*\/?>/gi, "\n"));
    }

}

const originalLog = console.log.bind(console);
console.log = (...args) => {
    displayMessage(args.join(" "));
};

window.addEventListener("unhandledrejection", (event) => {
    displayMessage(`Помилка(promise): ${event.reason}`);
});

window.addEventListener("error", (event) => {
    displayMessage(`Помилка: ${event.error?.message || event.message}`);
});

function displayMessage(message: string) {
    const outputElementContainer: HTMLDivElement = document.querySelector(".outputs__content");
    const outputElement: HTMLPreElement = document.createElement("pre");
    outputElement.classList.add("console-output");
    outputElementContainer.prepend(outputElement);
    outputElement.innerHTML = message;
}



add.addEventListener("click", () => performMatrixOperation("add"));
multiply.addEventListener("click", () => performMatrixOperation("multiply"));
transponed.addEventListener("click", () => performSingleMatrixOperation("transponeMe"));
determinate.addEventListener("click", () => performSingleMatrixOperation("calcDeterminant"));

function performMatrixOperation(operation: "add" | "multiply") {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrix2: HTMLDivElement = document.querySelector(".matrix2");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);
    const matrixSecond: MyMatrix = makeMyMatrixFromInputs(matrix2);

    const matrixResult: MyMatrix = matrixFirst[operation](matrixSecond);
    const matrixResultStr: string = matrixResult.toString();

    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    } else {
        console.log(`Результат ${operation === "add" ? "додавання" : "множення"}:\n${matrixResultStr}`);
    }
}

function performSingleMatrixOperation(operation: "transponeMe" | "calcDeterminant") {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);

    if (operation === "calcDeterminant") {
        const determinant: number = matrixFirst.calcDeterminant();
        console.log("Детермінант: " + determinant);
    } else {
        matrixFirst.transponeMe();
        console.log("Результат транспонування:\n" + matrixFirst.toString());
    }
}

//from file
const file1 = document.getElementById("file1") as HTMLInputElement;
const file2 = document.getElementById("file2") as HTMLInputElement;
file1.addEventListener("change", handleFileSelect);
file2.addEventListener("change", handleFileSelect);

function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        readFile(file, event.target);
    } else {
        console.log("Файл не вибрано");
    }
}

function readFile(file: File, eventInput: EventTarget) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
            const text: string = e.target.result as string;

            if (eventInput === file1) {
                console.log("Матриця 1 з файлу: \n" + text);
                const m1 = document.querySelector(".matrix1");
                m1.innerHTML = "";
                m1.classList.add("from-file")
                m1.innerHTML = text.replace(/\n/g, "<br>");
                addColumn1.disabled = true;
                addRow1.disabled = true;
                removeColumn1.disabled = true;
                removeRow1.disabled = true;
            } else if (eventInput === file2) {
                console.log("Матриця 2 з файлу: \n" + text);
                const m2 = document.querySelector(".matrix2");
                m2.innerHTML = "";
                m2.classList.add("from-file")
                m2.innerHTML = text.replace(/\n/g, "<br>");
                addColumn2.disabled = true;
                addRow2.disabled = true;
                removeColumn2.disabled = true;
                removeRow2.disabled = true;
            } else {
                console.log("Помилка в знайденні input");
            }
        }
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
        console.error("Помилка читання файла:", e);
    };

    reader.readAsText(file);
}

file1.addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
        this.setAttribute("placeholder", this.files[0].name);
    }
});
file2.addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
        this.setAttribute("placeholder", this.files[0].name);
    }
});