import React, { useState, useEffect } from "react";
import Robot from "./robot.js";
import Controller from "./controller";
import { generateGridArray } from "./util";
import GridArray from "./grid_array";

export default function Grid() {
    //generate Grid
    const [chanceOfTrash, setChangeOfTrash] = useState(20);
    const [gridSize, setGridSize] = useState(5);
    const [numberOfRuns, setNumberOfRuns] = useState(0);
    let [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
    const [robotPos, setRobotPos] = useState(initrobot);
    const [gridArray, setGridArray] = useState(initgrid);

    //debugg
    window.robot = robotPos;
    window.grid = gridArray;

    // update grid size
    useEffect(() => {
        [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
        setRobotPos(initrobot);
        setGridArray(initgrid);
    }, [gridSize, chanceOfTrash, numberOfRuns]);

    return (
        <>
            <Controller
                setGridSize={setGridSize}
                setChangeOfTrash={setChangeOfTrash}
                setNumberOfRuns={setNumberOfRuns}
                gridSize={gridSize}
                chanceOfTrash={chanceOfTrash}
            />
            <GridArray gridArray={gridArray} />
            <Robot
                robotPos={robotPos}
                gridArray={gridArray}
                setRobotPos={setRobotPos}
                setGridArray={setGridArray}
            />
        </>
    );
}
