export const stateValues = {
    left: { trash: 2, empty: 3, wall: 5 },
    right: { trash: 7, empty: 11, wall: 13 },
    up: { trash: 17, empty: 19, wall: 23 },
    down: { trash: 29, empty: 31, wall: 37 },
    current: { trash: 41, empty: 43 }
};

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
            const hasTrash = Math.random() * 100 < chanceOfTrash ? true : false;
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
        stateSum *= stateValues[dir][checkPos(dir)];
    });

    return { robotState, stateSum };
}

export function combineArrays(array_of_arrays) {
    // Start "odometer" with a 0 for each array in array_of_arrays.
    let odometer = new Array(array_of_arrays.length);
    odometer.fill(0);

    let output = [];

    let newCombination = formCombination(odometer, array_of_arrays);

    output.push(newCombination.trim());

    while (odometer_increment(odometer, array_of_arrays)) {
        newCombination = formCombination(odometer, array_of_arrays);
        output.push(newCombination.trim());
    }

    return output;
}

// Translate "odometer" to combinations from array_of_arrays
function formCombination(odometer, array_of_arrays) {
    // In Imperative Programmingese (i.e., English):
    let s_output = "";
    for (let i = 0; i < odometer.length; i++) {
        s_output += " " + array_of_arrays[i][odometer[i]];
    }
    return s_output;

    // In Functional Programmingese (Henny Youngman one-liner):
    // return odometer.reduce(function(
    //     accumulator,
    //     odometer_value,
    //     odometer_index
    // ) {
    //     return (
    //         "" + accumulator + array_of_arrays[odometer_index][odometer_value]
    //     );
    // },
    // "");
}

function odometer_increment(odometer, array_of_arrays) {
    for (
        let i_odometer_digit = odometer.length - 1;
        i_odometer_digit >= 0;
        i_odometer_digit--
    ) {
        let maxee = array_of_arrays[i_odometer_digit].length - 1;

        if (odometer[i_odometer_digit] + 1 <= maxee) {
            odometer[i_odometer_digit]++;
            return true;
        } else {
            if (i_odometer_digit - 1 < 0) {
                // No more digits left to increment, end of the line...
                return false;
            } else {
                // Can't increment this digit, cycle it to zero and continue
                // the loop to go over to the next digit...
                odometer[i_odometer_digit] = 0;
                continue;
            }
        }
    }
}

export function getStateSum(gridState) {
    let stateSum = 1;
    Object.keys(gridState).forEach(dir => {
        stateSum *= stateValues[dir][gridState[dir]];
    });
    return stateSum;
}

//gen combination wall all possible states
// up, down, left, right, current
// return all posibles combinatios with statesum
const genCombination = () => {
    const posStates = {
        up: ["trash", "wall", "empty"],
        down: ["trash", "wall", "empty"],
        left: ["trash", "wall", "empty"],
        right: ["trash", "wall", "empty"],
        current: ["trash", "empty"]
    };
    let posArray = Object.values(posStates);
    let arrStates = combineArrays(posArray);
    let possiblesStates = {};

    // remove impossible states
    for (let states of arrStates) {
        // states: string

        let numWalls = states.split(" ").reduce((acc, val) => {
            if (val === "wall") {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);

        // revove state if more than 3 wall and if wall are up down or left right
        let [up, down, left, right] = states.split(" ");
        //remove 3 and 4 wall
        if (numWalls < 3) {
            if (
                !(
                    (up === "wall" && down === "wall") ||
                    (left === "wall" && right === "wall")
                )
            ) {
                let pos = ["up", "down", "left", "right", "current"];
                let statesObject = {};
                states.split(" ").forEach((el, i) => {
                    statesObject[pos[i]] = el;
                });
                let stateSum = getStateSum(statesObject);
                statesObject["stateSum"] = stateSum;
                possiblesStates[stateSum] = statesObject;
                // possiblesStates.push(statesObject);
            }
        }
    }
    return possiblesStates;
};

function genRobot() {
    const possibilites = genCombination();
    const posMoves = ["up", "down", "left", "right", "getTrash"];
    // for (let i = 0; i < possibilites.length; i++) {
    for (let poss of Object.values(possibilites)) {
        let { up, down, left, right, current } = poss;
        let availibleMoves = [];
        //remove impossible moves
        [up, down, left, right].forEach((p, i) => {
            if (p !== "wall") {
                availibleMoves.push(posMoves[i]);
            }
        });

        // if current has trash
        if (current === "trash") {
            availibleMoves.push("getTrash");
            //possibilites[currSum]
            poss["action"] =
                availibleMoves[
                    Math.floor(
                        Math.floor(Math.random() * availibleMoves.length)
                    )
                ];
        } else {
            // possibilites[currSum];
            poss["action"] =
                availibleMoves[
                    Math.floor(
                        Math.floor(Math.random() * availibleMoves.length)
                    )
                ];
        }
    }
    return {
        metadata: { score: 0, weight: 0 },
        possibilites
    };
}

export function genRobots(numbers = 1) {
    let robots = [];
    for (let i = 0; i < numbers; i++) {
        robots.push(genRobot());
    }

    return robots;
}

// function moveRobot(gridArray, robotPos, robot) {
//     switch (robot.move) {
//         case "up":
//             nextPos = gridArray[col][row - 1][0];
//             return updateRobotPos(nextPos, robotPos, gridArray, robot);

//         case "down":
//             nextPos = gridArray[col][row + 1][0];
//             return updateRobotPos(nextPos, robotPos, gridArray, robot);

//         case "left":
//             nextPos = gridArray[col - 1][row][0];
//             return updateRobotPos(nextPos, robotPos, gridArray, robot);

//         case "right":
//             nextPos = gridArray[col + 1][row][0];
//             return updateRobotPos(nextPos, robotPos, gridArray, robot);

//         case "getTrash":
//             // current position
//             let currPos = gridArray[col][row][0];
//             let hasTrash = gridArray[col][row][1];
//             if (hasTrash)
//                 return updateRobotPos(
//                     currPos,
//                     robotPos,
//                     gridArray,
//                     robot,
//                     true
//                 );
//             break;

//         default:
//             throw Error("Please specify movment");
//     }
// }
// function updateRobotPos(newPos, oldPos, gridArray, getTrash = false) {
//     // update grid with new states
//     const nextGridArray = () => {
//         let prevGridArray = gridArray;

//         if (getTrash) {
//             // remove trash from grid from grid
//             prevGridArray[oldPos[0]][oldPos[1]][1] = false;

//             dispatch({ type: "setRobotPos", payload: newPos });

//             // add to counter
//             dispatch({
//                 type: "setTrashCollected",
//                 payload: state.grid.trashColleted + 1
//             });
//         } else {
//             // remove robot position of GridArray
//             prevGridArray[oldPos[0]][oldPos[1]][2] = false;
//             // add robot new position into array
//             prevGridArray[newPos[0]][newPos[1]][2] = true;

//             dispatch({ type: "setRobotPos", payload: newPos });
//         }

//         dispatch({ type: "setMoves", payload: state.grid.moves + 1 });
//         return prevGridArray;
//     };
//     dispatch({ type: "setGridArray", payload: nextGridArray() });

//     return true;
// }

// function getNextMove(gridArray, robotPos) {
//     let [robotState, stateSum] = checkRobotState(gridArray, robotPos);
//     // let gridState = checkRobotState(gridArray, robotPos);
//     // check if state is set on posibilities state by the user
//     return robot.possibilites.stateSum[stateSum];
// }

