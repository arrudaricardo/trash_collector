import React, { useState, useEffect } from "react";
import Robot from "./robot.js";
import Controller from "./controller";
import { generateGridArray } from "./util";
import GridArray from "./grid_array";

export default function Grid() {
    //generate Grid
    const [chanceOfTrash, setChangeOfTrash] = useState(30);
    const [gridSize, setGridSize] = useState(5);
    const [numberOfRuns, setNumberOfRuns] = useState(0);
    let [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
    const [robotPos, setRobotPos] = useState(initrobot);
    const [gridArray, setGridArray] = useState(initgrid);
    const [gameOver, setGameOver] = useState(false)
    const [moves, setMoves] = useState(0);
    const [trashColleted, setTrashCollected] = useState(0);


    useEffect(() => {
        resetGridArray();
    }, [gridSize, gridSize, chanceOfTrash]);


    function resetGridArray () {
        [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
        setRobotPos(initrobot);
        setGridArray(initgrid);
    }



    return (
        <>
            <Controller
                resetGridArray={resetGridArray}
                setGridSize={setGridSize}
                setChangeOfTrash={setChangeOfTrash}
                setNumberOfRuns={setNumberOfRuns}
                gridSize={gridSize}
                chanceOfTrash={chanceOfTrash}
                gameOver={gameOver}
            />
            <GridArray robotPos={robotPos} gridArray={gridArray} />
            <Robot
                resetGridArray={resetGridArray}
                robotPos={robotPos}
                gridArray={gridArray}
                setRobotPos={setRobotPos}
                setGridArray={setGridArray}
                gameOver={gameOver}
                setGameOver={setGameOver}
                moves={moves}
                setMoves={setMoves}
                trashColleted={trashColleted}
                setTrashCollected={setTrashCollected}
            />
        </>
    );
}
