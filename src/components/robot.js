import React, { useState, useEffect, useRef } from "react";

export default function Robot({
    id,
    gridArray,
    setGridArray,
    robotPos,
    setRobotPos
}) {
    const [trashColleted, setTrashCollected] = useState(0);
    const [moves, setMoves] = useState(0);
    const [script, setScript] = useState("");
    const grid = useRef(gridArray);

    // restart grid
    useEffect(() => {
        setMoves(0);
        setTrashCollected(0);
    }, [gridArray]);

    

    function inputHandle(move) {
        let nextPos, hasTrashNext;
        let [col, row] = robotPos;

        // console.log('robotPos',pos,'hasTrash', hasTrash)
        switch (move) {
            case "up":
                // if col is < 0, next position is 'wall'
                if (row - 1 < 0) {
                    nextPos = "wall";
                } else {
                    [nextPos, hasTrashNext] = gridArray[col][row - 1];
                }
                return updateRobotPos(nextPos, robotPos, hasTrashNext);

            case "down":
                [nextPos, hasTrashNext] = gridArray[col][row + 1] || [
                    "wall",
                    "wall"
                ];
                return updateRobotPos(nextPos, robotPos, hasTrashNext);

            case "left":
                // if col is < 0, next position is 'wall'
                if (col - 1 < 0) {
                    nextPos = "wall";
                } else {
                    [nextPos, hasTrashNext] = gridArray[col - 1][row];
                }
                return updateRobotPos(nextPos, robotPos, hasTrashNext);

            case "right":
                if (gridArray[col + 1] === undefined) {
                    nextPos = "wall";
                } else {
                    [nextPos, hasTrashNext] = gridArray[col + 1][row];
                }
                return updateRobotPos(nextPos, robotPos, hasTrashNext);

            default:
                break;
        }
    }

    const arrowKeyListener = () => {
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    inputHandle("left");
                    break;
                case 38:
                    inputHandle("up");
                    break;
                case 39:
                    inputHandle("right");
                    break;
                case 40:
                    inputHandle("down");
                    break;
                default:
                    break;
            }
        };
    };

    arrowKeyListener();

    function checkPos(direction) {
        let hasTrashNext;
        let [col, row] = robotPos;

        switch (direction) {
            case "up":
            case "UP":
                if (row - 1 < 0) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col][row - 1][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }
            case "down":
            case "DOWN":
                hasTrashNext = gridArray[col][row + 1][1] || "WALL";
                if (hasTrashNext === true) {
                    return "TRASH";
                } else if (hasTrashNext === false) {
                    return "EMPTY";
                } else {
                    return "WALL";
                }

            case "left":
            case "LEFT":
                if (col - 1 < 0) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col - 1][row][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }
            case "right":
            case "RIGHT":
                if (gridArray[col + 1] === undefined) {
                    return "WALL";
                } else {
                    hasTrashNext = gridArray[col + 1][row][1];
                    return hasTrashNext ? "TRASH" : "EMPTY";
                }

            default:
                return "Wrong direction";
        }
    }

    function updateRobotPos(newPos, oldPos, hasTrash) {
        // console.log('oldbox',gridArray[oldPos[0]][oldPos[1]])
        if (newPos === "wall") {
            console.log("hit a wall");
            return false;
        }

        setGridArray(prevGridArray => {
            // prevGridArray = grid.current
            if (hasTrash) {
                // add to counter
                setTrashCollected(trashColleted + 1);
                // remove trash from grid from grid
                prevGridArray[newPos[0]][newPos[1]][1] = false;
            }
            // remove robot position of GridArray
            prevGridArray[oldPos[0]][oldPos[1]][2] = false;

            // add robot new position into array
            prevGridArray[newPos[0]][newPos[1]][2] = true;

            setRobotPos(newPos); // update robot pos
            // setGridArray(gridArray) // update grid
            setMoves(moves + 1);
            return prevGridArray;
        });

        return true;
    }

    //script

    function handleScript(event) {
        setScript(event.target.value);
    }

    //Block by identention and semicolen
    // Directions <DIR>: UP, DOWN, LEFT, RIGHT
    // Action: GO <DIR>
    // Elements <ELE>: WALL, EMPTY, TRASH
    // Logical operator <LO>: OR, AND, NOT, IS
    // Condicionals: IF, ELSE
    //
    // Exemple:
    // IF (<DIR> <LO> <ELE>):
    //  GO <DIR>
    // ELSE:
    // GO <DIR>
    //
    // Action GO <DIR> execute script

    function parseScript(script) {
        // console.log(script)
        let executionLines = script.split(/[\r\n]+/g); //by line break; 
        return executionLines;
    }

    function runScript(event) {
        // return key
        let wallHits = 0;
        let scriptParsed = parseScript(script);

        // regex
        let regexIf = /if\s(up|down|left|right)\s(empty|trash|wall|):\n(up|down|left|right)/i;
        console.log("execution script", scriptParsed);
        // exec loop

        const execution = function() {
            const executionStack = [];
            for (let line of scriptParsed) {
                let match = regexDir.exec(line)[1];
                let checkedPos = checkPos(match);
                console.log("Going", match, "It is:", checkedPos);
                executionStack.push(match);
                const validMove = inputHandle(match);
                // check for wall hits
                console.log("validMove?", validMove);
                if (!validMove) {
                    wallHits++;
                    // if hit wall n times in a row stop
                }
            }
            if (wallHits < 3) {
                // setTimeout(() => execution(), 1000)
            }
            return true;
        };

        execution();
    }

    return (
        <div className="robot-input" id="{id}">
            <div id="controller">
                <div>
                    <button
                        style={{ marginLeft: "38px" }}
                        id="up"
                        onClick={e => inputHandle("up")}
                    >
                        {" "}
                        ^{" "}
                    </button>
                </div>

                <div>
                    <button
                        style={{ marginLeft: "15px" }}
                        id="left"
                        onClick={e => inputHandle("left")}
                    >
                        {" "}
                        {"<"}{" "}
                    </button>
                    <button
                        style={{ marginLeft: "20px" }}
                        id="right"
                        onClick={e => inputHandle("right")}
                    >
                        {" "}
                        {">"}{" "}
                    </button>
                </div>

                <div>
                    <button
                        style={{ marginLeft: "38px" }}
                        id="donw"
                        onClick={e => inputHandle("down")}
                    >
                        {" "}
                        v{" "}
                    </button>
                </div>
            </div>

            <div className="robot-information">
                <div className="trashColleted">
                    Trash Collected: {trashColleted}
                </div>
                <div className="moves">Moves: {moves}</div>
            </div>

            <div id="script">
                <textarea value={script} onChange={handleScript} />
                <button onClick={runScript}>RUN</button>
            </div>
        </div>
    );
}
