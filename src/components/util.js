export const stateValues = {
    left :{trash: 2, empty: 3, wall: 5},
    right :{trash: 7, empty: 11, wall: 13},
    up :{trash: 17, empty: 19, wall: 23},
    down :{trash: 29, empty: 31, wall: 37},
    current :{trash: 41, empty: 43}
}

export function generateGridArray(size, chanceOfTrash) {
    // grid[
    //  [[pos,hastrash,hasRobot],[],[]],
    //  [[],[],[]],
    //  [[],[],[]]
    // ]
    let robotPos;
    const genRobotPos = () => {
        const posX = Math.floor(Math.random() * size);
        const posY = Math.floor(Math.random() * size);
        robotPos = [posX, posY];
        //compare pos
        return (x, y) => (posX === x && posY === y ? true : false);
    };
    const checkPos = genRobotPos();
    // generate a square grid sizeXsize
    const grid = [];
    for (let x = 0; x < size; x++) {
        const boxs = [];
        for (let y = 0; y < size; y++) {
            const pos = [x, y];
            const hasTrash =
                Math.random() * 100 < chanceOfTrash
                    ? true
                    : false;
            const hasRobot = checkPos(x, y);
            boxs.push([pos, hasTrash, hasRobot]);
        }
        grid.push(boxs);
    }
    return [grid, robotPos];
}


export function checkRobotState(gridArray, robotPos) {
    const robotState = {};
    let stateSum = 1;
    const checkPos = direction => {
        let hasTrashNext;
        let [col, row] = robotPos;

        switch (direction) {
            case "up":
                if (row - 1 < 0) {
                    return "wall";
                } else {
                    hasTrashNext = gridArray[col][row - 1][1];
                    return hasTrashNext ? "trash" : "empty";
                }
            case "down":
                let position = gridArray[col][row + 1] || "wall";
                if (position[1] === true) {
                    return "trash";
                } else if (position[1] === false) {
                    return "empty";
                } else {
                    return "wall";
                }

            case "left":
                if (col - 1 < 0) {
                    return "wall";
                } else {
                    hasTrashNext = gridArray[col - 1][row][1];
                    return hasTrashNext ? "trash" : "empty";
                }
            case "right":
                if (gridArray[col + 1] === undefined) {
                    return "wall";
                } else {
                    hasTrashNext = gridArray[col + 1][row][1];
                    return hasTrashNext ? "trash" : "empty";
                }

            case "current":
                let hasTrash = gridArray[col][row][1];
                return hasTrash ? "trash" : "empty";

            default:
                return "Wrong direction";
        }
    };

    ["up", "down", "left", "right", "current"].forEach(dir => {
        robotState[dir] = checkPos(dir);
        stateSum *= stateValues[dir][checkPos(dir)]
    });

    return {robotState, stateSum}
}


