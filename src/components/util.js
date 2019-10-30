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
    const checkPos = direction => {
        let hasTrashNext;
        let [col, row] = robotPos;

        switch (direction) {
            case "up":
                if (row - 1 < 0) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col][row - 1][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }
            case "down":
                let position = gridArray[col][row + 1] || "WALL";
                if (position[1] === true) {
                    return "TRASH";
                } else if (position[1] === false) {
                    return "EMPTY";
                } else {
                    return "WALL";
                }

            case "left":
                if (col - 1 < 0) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col - 1][row][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }
            case "right":
                if (gridArray[col + 1] === undefined) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col + 1][row][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }

            case "current":
                let hasTrash = gridArray[col][row][1];
                return hasTrash ? "TRASH" : "EMPTY";

            default:
                return "Wrong direction";
        }
    };

    ["up", "down", "left", "right", "current"].forEach(dir => {
        robotState[dir] = checkPos(dir);
    });

    return robotState;
}
