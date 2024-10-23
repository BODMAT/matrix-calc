import MyMatrix from "./MatrixOperations.js";
const MAXCOLUMNS = 7;
const add = document.querySelector(".add");
const multiply = document.querySelector(".multiply");
const transponed = document.querySelector(".transponed");
const determinate = document.querySelector(".determinate");
const addColumn1 = document.querySelector(".addColumn1");
const addRow1 = document.querySelector(".addRow1");
const addColumn2 = document.querySelector(".addColumn2");
const addRow2 = document.querySelector(".addRow2");
const removeColumn1 = document.querySelector(".removeColumn1");
const removeRow1 = document.querySelector(".removeRow1");
const removeColumn2 = document.querySelector(".removeColumn2");
const removeRow2 = document.querySelector(".removeRow2");
const clear = document.querySelector(".clear");
function addRow(matrixClass) {
    const position = document.querySelector(matrixClass);
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell");
    let str = `<div class="row">`;
    elNum.forEach(() => {
        str += `<input type="text" class="matrix-cell">`;
    });
    str += `</div>`;
    position.insertAdjacentHTML("beforeend", str);
}
function addColumn(matrixClass) {
    const position = document.querySelector(matrixClass);
    const rows = position.querySelectorAll(".row");
    const numOfColumns = rows[0].querySelectorAll(".matrix-cell").length;
    for (let i = 0; i < rows.length && numOfColumns <= MAXCOLUMNS; i++) {
        let row = rows[i];
        row.insertAdjacentHTML("beforeend", `<input type="text" class="matrix-cell">`);
    }
}
function removeRow(matrixClass) {
    const position = document.querySelector(matrixClass);
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
}
function removeColumn(matrixClass) {
    const position = document.querySelector(matrixClass);
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
    inputs.forEach((input) => {
        input.value = "";
    });
});
function makeMyMatrixFromInputs(matrix) {
    let inputs = Array.from(matrix.querySelectorAll(".matrix-cell"));
    let width = matrix.querySelector(".row")?.querySelectorAll(".matrix-cell")?.length || 0;
    let height = matrix.querySelectorAll(".row")?.length || 0;
    if (width === 0 || height === 0) {
        throw new Error("Matrix is empty");
    }
    let matrixArray = [];
    for (let i = 0; i < height; i++) {
        let rowArray = [];
        for (let j = 0; j < width; j++) {
            let index = i * width + j;
            rowArray.push(parseFloat(inputs[index].value));
        }
        matrixArray.push(rowArray);
    }
    return new MyMatrix(matrixArray);
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
function displayMessage(message) {
    const outputElementContainer = document.querySelector(".outputs__content");
    const outputElement = document.createElement("pre");
    outputElement.classList.add("console-output");
    outputElementContainer.prepend(outputElement);
    outputElement.innerHTML = message;
}
add.addEventListener("click", () => performMatrixOperation("add"));
multiply.addEventListener("click", () => performMatrixOperation("multiply"));
transponed.addEventListener("click", () => performSingleMatrixOperation("transponeMe"));
determinate.addEventListener("click", () => performSingleMatrixOperation("calcDeterminant"));
function performMatrixOperation(operation) {
    const matrix1 = document.querySelector(".matrix1");
    const matrix2 = document.querySelector(".matrix2");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    const matrixSecond = makeMyMatrixFromInputs(matrix2);
    const matrixResult = matrixFirst[operation](matrixSecond);
    const matrixResultStr = matrixResult.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    }
    else {
        console.log(`Результат ${operation === "add" ? "додавання" : "множення"}:\n${matrixResultStr}`);
    }
}
function performSingleMatrixOperation(operation) {
    const matrix1 = document.querySelector(".matrix1");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    if (operation === "calcDeterminant") {
        const determinant = matrixFirst.calcDeterminant();
        console.log("Детермінант: " + determinant);
    }
    else {
        matrixFirst.transponeMe();
        console.log("Результат транспонування:\n" + matrixFirst.toString());
    }
}
//# sourceMappingURL=client.js.map