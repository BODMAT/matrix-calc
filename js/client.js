import MyMatrix from "./MatrixOperations.js";
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
addRow1.addEventListener("click", () => {
    const position = document.querySelector(".matrix1");
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell");
    let str = `<div class="row">
    `;
    elNum.forEach(row => {
        str += `<input type="text" class="matrix-cell">
        `;
    });
    str += `</div>`;
    position.insertAdjacentHTML("beforeend", str);
});
addRow2.addEventListener("click", () => {
    const position = document.querySelector(".matrix2");
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell");
    let str = `<div class="row">
    `;
    elNum.forEach(row => {
        str += `<input type="text" class="matrix-cell">
        `;
    });
    str += `</div>`;
    position.insertAdjacentHTML("beforeend", str);
});
addColumn1.addEventListener("click", () => {
    const position = document.querySelector(".matrix1");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        row.insertAdjacentHTML("beforeend", `<input type="text" class="matrix-cell">`);
    });
});
addColumn2.addEventListener("click", () => {
    const position = document.querySelector(".matrix2");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        row.insertAdjacentHTML("beforeend", `<input type="text" class="matrix-cell">`);
    });
});
removeColumn1.addEventListener("click", () => {
    const position = document.querySelector(".matrix1");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        const cells = row.querySelectorAll(".matrix-cell");
        if (cells.length > 1) {
            row.removeChild(cells[cells.length - 1]);
        }
    });
});
removeColumn2.addEventListener("click", () => {
    const position = document.querySelector(".matrix2");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        const cells = row.querySelectorAll(".matrix-cell");
        if (cells.length > 1) {
            row.removeChild(cells[cells.length - 1]);
        }
    });
});
removeRow1.addEventListener("click", () => {
    const position = document.querySelector(".matrix1");
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
});
removeRow2.addEventListener("click", () => {
    const position = document.querySelector(".matrix2");
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
});
clear.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".matrix-cell");
    inputs.forEach((input) => {
        input.value = "";
    });
});
const originalLog = console.log.bind(console);
console.log = (...args) => {
    displayMessage(args.join(" "));
};
window.addEventListener("unhandledrejection", (event) => {
    displayMessage(`Помилка (promise): ${event.reason}`);
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
add.addEventListener("click", () => {
    const matrix1 = document.querySelector(".matrix1");
    const matrix2 = document.querySelector(".matrix2");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    const matrixSecond = makeMyMatrixFromInputs(matrix2);
    const matrixResult = matrixFirst.add(matrixSecond);
    const matrixResultStr = matrixResult.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    }
    else {
        console.log("Результат додавання:" + "\n" + matrixResultStr);
    }
});
multiply.addEventListener("click", () => {
    const matrix1 = document.querySelector(".matrix1");
    const matrix2 = document.querySelector(".matrix2");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    const matrixSecond = makeMyMatrixFromInputs(matrix2);
    const matrixResult = matrixFirst.multiply(matrixSecond);
    const matrixResultStr = matrixResult.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    }
    else {
        console.log("Результат множення:" + "\n" + matrixResultStr);
    }
});
transponed.addEventListener("click", () => {
    const matrix1 = document.querySelector(".matrix1");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    matrixFirst.transponeMe();
    const matrixResultStr = matrixFirst.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    }
    else {
        console.log("Результат транспонування:" + "\n" + matrixResultStr);
    }
});
determinate.addEventListener("click", () => {
    const matrix1 = document.querySelector(".matrix1");
    const matrixFirst = makeMyMatrixFromInputs(matrix1);
    const matrixResultStr = matrixFirst.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    }
    else {
        const determinant = matrixFirst.calcDeterminant();
        console.log("Детермінант:" + determinant);
    }
});
//# sourceMappingURL=client.js.map