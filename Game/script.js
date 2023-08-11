const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

class Obj1 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 100;
        this._height = 100;
        this._color = "orange"

        this._img = new Image();
        this._img.src = "obj-1.png";
    }
    render() {
        if (this._color !== null) context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
}

class Obj2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 100;
        this._height = 100;
        this._color = "blue"

        this._img = new Image();
        this._img.src = "obj-2.png";
    }
    render() {
        if (this._color !== null) context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
}
class Obj3 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 100;
        this._height = 100;
        this._color = "red"

        this._img = new Image();
        this._img.src = "obj-3.png";
    }
    render() {
        if (this._color !== null) context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
}
class Obj4 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 100;
        this._height = 100;
        this._color = "yellow"

        this._img = new Image();
        this._img.src = "obj-4.png";
    }
    render() {
        if (this._color !== null) context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
}





let data = {
    objects: []
};

const objectCoords = [];
const numRows = 8;
const numCols = 6;
const rectSize = 126;

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const x = col * rectSize;
        const y = row * rectSize;

        let shouldExclude = false;

        // Check if the current coordinates match any exclusion coordinates
        if (
            (x === 0 && y === 0) ||
            (x === 630 && y === 0) ||
            (x === 252 && y === 378) ||
            (x === 378 && y === 378) ||
            (x === 252 && y === 504) ||
            (x === 378 && y === 504) ||
            (x === 0 && y === 882) ||
            (x === 630 && y === 882)
        ) {
            shouldExclude = true;
        }

        if (shouldExclude) {
            objectCoords.push({ color: null });
        } else {
            objectCoords.push({ x, y });
        }
    }
}
for (const { x, y } of objectCoords) {
    const ObjectClass = getRandomObjectClass();
    const newObj = new ObjectClass(x, y);
    data.objects.push(newObj);
}

function update() {
    data.objects = data.objects.filter((obj) => obj._color !== null);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    data.objects.forEach(obj => {
        // if (obj._y === 0) console.log("obj:", { x: obj._x, y: obj._y, color: obj._color });
        obj.render()
    });
}

function loop() {
    requestAnimationFrame(loop);
    update();
    render();
}

loop();


canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedRow = Math.floor(mouseY / rectSize);
    const clickedCol = Math.floor(mouseX / rectSize);
    onCandyClick(clickedRow, clickedCol);
});

let selectedCandy = null;

function onCandyClick(row, col) {
    // Check if the clicked cell has valid coordinates
    if (row === undefined || col === undefined) {
        return; // Ignore the click
    }

    if (selectedCandy === null) {
        selectedCandy = { row, col };
    } else {
        const selectedObjIndex = selectedCandy.row * numCols + selectedCandy.col;
        const targetObjIndex = row * numCols + col;

        // Check if the target cell has valid coordinates
        if (data.objects[selectedObjIndex]._x === undefined || data.objects[selectedObjIndex]._y === undefined ||
            data.objects[targetObjIndex]._x === undefined || data.objects[targetObjIndex]._y === undefined) {
            selectedCandy = null; // Clear the selection
            return; // Ignore the click
        }

        const rowDiff = Math.abs(row - selectedCandy.row);
        const colDiff = Math.abs(col - selectedCandy.col);

        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
            const selectedObj = data.objects[selectedObjIndex];
            const targetObj = data.objects[targetObjIndex];

            // Swap objects
            swapObjects(selectedObj, targetObj);

            // Clear selection
            selectedCandy = null;

            // Update the canvas
            render();
        } else if (selectedCandy.row === row && selectedCandy.col === col) {
            // Clicking the same object again clears the selection
            selectedCandy = null;
        } else {
            // Clicking on a non-adjacent object updates the selection
            selectedCandy = { row, col };
        }
    }
}






//////////functions

function swapObjects(obj1, obj2) {
    console.log("Before swapping:");
    console.log("obj1:", { x: obj1._x, y: obj1._y, color: obj1._color });
    console.log("obj2:", { x: obj2._x, y: obj2._y, color: obj2._color });

    // Swap x and y coordinates
    const tempX = obj1._x;
    const tempY = obj1._y;
    obj1._x = obj2._x;
    obj1._y = obj2._y;
    obj2._x = tempX;
    obj2._y = tempY;

    // Swap positions in the data.objects array
    const index1 = data.objects.indexOf(obj1);
    const index2 = data.objects.indexOf(obj2);
    [data.objects[index1], data.objects[index2]] = [data.objects[index2], data.objects[index1]];

    console.log("After swapping:");
    console.log("obj1:", { x: obj1._x, y: obj1._y, color: obj1._color });
    console.log("obj2:", { x: obj2._x, y: obj2._y, color: obj2._color });
}


function getRandomObjectClass() {
    const objectClasses = [Obj1, Obj2, Obj3, Obj4];
    const randomIndex = Math.floor(Math.random() * objectClasses.length);
    return objectClasses[randomIndex];
}











