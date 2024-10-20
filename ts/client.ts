import MyMatrix from "./MatrixOperations.js";

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

addRow1.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix1");
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell")
    let str = `<div class="row">
    `
    elNum.forEach(row => {
        str += `<input type="text" class="matrix-cell">
        `
    })
    str += `</div>`

    position.insertAdjacentHTML(
        "beforeend", str
    )
})
addRow2.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix2");
    const row = position.querySelector(".row");
    const elNum = row.querySelectorAll(".matrix-cell")
    let str = `<div class="row">
    `
    elNum.forEach(row => {
        str += `<input type="text" class="matrix-cell">
        `
    })
    str += `</div>`

    position.insertAdjacentHTML(
        "beforeend", str
    )
})

addColumn1.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix1");
    const rows = position.querySelectorAll(".row")
    rows.forEach(row => {
        row.insertAdjacentHTML(
            "beforeend", `<input type="text" class="matrix-cell">`
        )
    })
})
addColumn2.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix2");
    const rows = position.querySelectorAll(".row")
    rows.forEach(row => {
        row.insertAdjacentHTML(
            "beforeend", `<input type="text" class="matrix-cell">`
        )
    })
})

removeColumn1.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix1");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        const cells = row.querySelectorAll(".matrix-cell");
        if (cells.length > 1) {
            row.removeChild(cells[cells.length - 1]);
        }
    });
});

removeColumn2.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix2");
    const rows = position.querySelectorAll(".row");
    rows.forEach(row => {
        const cells = row.querySelectorAll(".matrix-cell");
        if (cells.length > 1) {
            row.removeChild(cells[cells.length - 1]);
        }
    });
});

removeRow1.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix1");
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
});

removeRow2.addEventListener("click", () => {
    const position: HTMLDivElement = document.querySelector(".matrix2");
    if (position.querySelectorAll(".row").length > 1) {
        position.removeChild(position.lastElementChild);
    }
});

clear.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".matrix-cell");
    inputs.forEach((input: HTMLInputElement) => {
        input.value = "";
    })
})

//Output======================================================================
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
    const outputElementContainer: HTMLDivElement = document.querySelector(".outputs__content");
    const outputElement: HTMLPreElement = <HTMLPreElement>document.createElement("pre");
    outputElement.classList.add("console-output");
    outputElementContainer.prepend(outputElement);
    outputElement.innerHTML = message;
}
//Input======================================================================
function makeMyMatrixFromInputs(matrix: HTMLDivElement): MyMatrix {
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
}

add.addEventListener("click", () => {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrix2: HTMLDivElement = document.querySelector(".matrix2");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);
    const matrixSecond: MyMatrix = makeMyMatrixFromInputs(matrix2);
    const matrixResult: MyMatrix = matrixFirst.add(matrixSecond);
    const matrixResultStr: string = matrixResult.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    } else {
        console.log("Результат додавання:" + "\n" + matrixResultStr);
    }
})

multiply.addEventListener("click", () => {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrix2: HTMLDivElement = document.querySelector(".matrix2");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);
    const matrixSecond: MyMatrix = makeMyMatrixFromInputs(matrix2);
    const matrixResult: MyMatrix = matrixFirst.multiply(matrixSecond);
    const matrixResultStr: string = matrixResult.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    } else {
        console.log("Результат множення:" + "\n" + matrixResultStr);
    }
})

transponed.addEventListener("click", () => {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);
    matrixFirst.transponeMe()
    const matrixResultStr: string = matrixFirst.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    } else {
        console.log("Результат транспонування:" + "\n" + matrixResultStr);
    }
})

determinate.addEventListener("click", () => {
    const matrix1: HTMLDivElement = document.querySelector(".matrix1");
    const matrixFirst: MyMatrix = makeMyMatrixFromInputs(matrix1);
    const matrixResultStr: string = matrixFirst.toString();
    if (matrixResultStr.includes("NaN")) {
        console.log("Матриця порожня або її елементи не містять чисел");
    } else {
        const determinant: number = matrixFirst.calcDeterminant();
        console.log("Детермінант:" + determinant);
    }
})