import React, { useState, useEffect } from "react";
import Box from "./box.js";
import Robot from "./robot.js";

export default function Grid() {
    //generate Grid
    const [chanceOfTrash, setChangeOfTrash] = useState(0.2);

    const [gridSize, setGridSize] = useState(5);
    const [numberOfRuns, setNumberOfRuns] = useState(0);
    let [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);

    const [robotPos, setRobotPos] = useState(initrobot);
    const [gridArray, setGridArray] = useState(initgrid);

    //debugg
    window.robot = robotPos;
    window.grid = gridArray;

    let grid = gridArray.map((row, idx) => {
        const rows = row.map((e, idx2) => {
            return (
                <Box
                    key={Number(`${idx}${idx2}`)}
                    id={e[0]}
                    hasRobot={e[2]}
                    hasTrash={e[1]}
                />
            );
        });

        return <div className="gridRow"> {rows} </div>;
    });

    // update grid size
    useEffect(() => {
        [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
        setRobotPos(initrobot);
        setGridArray(initgrid);
    }, [gridSize, chanceOfTrash, numberOfRuns]);

    function handleGridChange(event) {
        setGridSize(event.target.value);
    }
    function handleChanceChange(event) {
        setChangeOfTrash(event.target.value);
    }

    function handleRestart(event) {
        event.preventDefault();
        setNumberOfRuns(numberOfRuns + 1);
    }

    return (
        <>
            <div className="grid-input">
                <div className="grid-size-input">
                    Grid Size:
                    <input
                        type="number"
                        min="1"
                        onChange={handleGridChange}
                        value={gridSize}
                    />
                </div>
                <div className="grid-change-input">
                    Trash:
                    <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={handleChanceChange}
                        value={chanceOfTrash}
                    />
                    %
                </div>
                <div className="grid-restart-input">
                    <button onClick={handleRestart}>Restart</button>
                </div>
            </div>

            <div className="gridContainer"> {grid} </div>
            <Robot
                robotPos={robotPos}
                gridArray={gridArray}
                setRobotPos={setRobotPos}
                setGridArray={setGridArray}
            />
        </>
    );
}

function generateGridArray(size, changeOfTrash) {
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
                Math.random() < changeOfTrash
                    ? checkPos(x, y)
                        ? false
                        : true
                    : false;
            const hasRobot = checkPos(x, y);
            boxs.push([pos, hasTrash, hasRobot]);
        }
        grid.push(boxs);
    }
    return [grid, robotPos];
}
