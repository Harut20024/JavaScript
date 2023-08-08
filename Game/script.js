const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const BackgroundImg = new Image();
BackgroundImg.src = "fone.jpg";

const cube = new Image();
cube.src = "back.png";


class GameObj {
    constructor(x, y, width, height, imgSrc) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        this._img = new Image();
        this._img.src = imgSrc;
        this._img.onload = () => this.render();
    }
    render() {
        context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
}

class obj1 extends GameObj {
    constructor(x, y) {
        super(x, y, 100, 100, "obj-1.png");
    }
}

class obj2 extends GameObj {
    constructor(x, y) {
        super(x, y, 100, 100, "obj-2.png");
    }
}

class obj3 extends GameObj {
    constructor(x, y) {
        super(x, y, 100, 100, "obj-3.png");
    }
}

class obj4 extends GameObj {
    constructor(x, y) {
        super(x, y, 100, 100, "obj-4.png");
    }
}

let data = {
    objects: []
};

function update() {
    // Check for and remove three adjacent obj1 objects
    // checkAndRemoveThreeAdjacentObjects(obj1);
    // checkAndRemoveThreeAdjacentObjects(obj2);
    // checkAndRemoveThreeAdjacentObjects(obj3);
    // checkAndRemoveThreeAdjacentObjects(obj4);


    // Implement your other game logic here
}


function getRandomObjectClass() {
    const objectClasses = [obj1, obj2, obj3, obj4];
    const randomIndex = Math.floor(Math.random() * objectClasses.length);
    return objectClasses[randomIndex];
}

const objectCoords = [];
const numRows = 9;
const numCols = 9;
const rectSize = 100;

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const x = col * rectSize + 1000;
        const y = row * rectSize + 240;
        if (
            (x === 1000 && y === 240) ||
            (x === 1800 && y === 240) ||
            (x === 1300 && y === 540) ||
            (x === 1400 && y === 540) ||
            (x === 1500 && y === 540) ||
            (x === 1300 && y === 640) ||
            (x === 1400 && y === 640) ||
            (x === 1500 && y === 640) ||
            (x === 1300 && y === 740) ||
            (x === 1400 && y === 740) ||
            (x === 1500 && y === 740)
        ) {
            objectCoords.push({ x: 3000, y: 3000 });
        } else {
            objectCoords.push({ x, y });
        }
    }
}

function checkAndRemoveThreeAdjacentObjects(objectType) {
    const matchedObjects = new Set();

    // Check for horizontal matches
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols - 2; col++) {
            const obj1A = data.objects[row * numCols + col];
            const obj1B = data.objects[row * numCols + col + 1];
            const obj1C = data.objects[row * numCols + col + 2];

            if (
                obj1A instanceof objectType &&
                obj1B instanceof objectType &&
                obj1C instanceof objectType
            ) {
                matchedObjects.add(obj1A);
                matchedObjects.add(obj1B);
                matchedObjects.add(obj1C);
            }
        }
    }

    // Check for vertical matches
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows - 2; row++) {
            const obj1A = data.objects[row * numCols + col];
            const obj1B = data.objects[(row + 1) * numCols + col];
            const obj1C = data.objects[(row + 2) * numCols + col];

            if (
                obj1A instanceof objectType &&
                obj1B instanceof objectType &&
                obj1C instanceof objectType
            ) {
                matchedObjects.add(obj1A);
                matchedObjects.add(obj1B);
                matchedObjects.add(obj1C);
            }
        }
    }

    // Remove matched objects
    matchedObjects.forEach(obj => {
        const index = data.objects.indexOf(obj);
        if (index !== -1) {
            data.objects.splice(index, 1);
        }
    });

    // Call the function recursively if matches were found and removed
    if (matchedObjects.size > 0) {
        checkAndRemoveThreeAdjacentObjects(objectType);
    }
}




for (const { x, y } of objectCoords) {
    const ObjectClass = getRandomObjectClass();
    const newObj = new ObjectClass(x, y);
    data.objects.push(newObj);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(BackgroundImg, 0, 0, canvas.width, canvas.height);

    for (const { x, y } of objectCoords) {
        context.drawImage(cube, x, y, rectSize, rectSize);
    }

    data.objects.forEach(obj => {
        obj.render();
    });
}

let selectedObj = null;

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (const obj of data.objects) {
        if (
            mouseX >= obj._x &&
            mouseX <= obj._x + obj._width &&
            mouseY >= obj._y &&
            mouseY <= obj._y + obj._height
        ) {
            if (!selectedObj) {
                selectedObj = obj;
            } else if (
                selectedObj !== obj &&
                selectedObj._x >= obj._x - 100 &&
                selectedObj._x <= obj._x + obj._width + 100 &&
                selectedObj._y >= obj._y - 100 &&
                selectedObj._y <= obj._y + obj._height + 100
            ) {
                // Swap positions of selectedObj and obj
                const tempX = selectedObj._x;
                const tempY = selectedObj._y;
                selectedObj._x = obj._x;
                selectedObj._y = obj._y;
                obj._x = tempX;
                obj._y = tempY;
                checkAndRemoveMatches()
                
                selectedObj = null; // Reset selectedObj
            }
            break;
        }
    }
});

function loop() {
    requestAnimationFrame(loop);
    update();
    render();
}

BackgroundImg.onload = loop;
cube.onload = loop;
