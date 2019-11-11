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
    const [results, setResults] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [moves, setMoves] = useState(0);
    const [trashColleted, setTrashCollected] = useState(0);


    useEffect(() => {
        [initgrid, initrobot] = generateGridArray(gridSize, chanceOfTrash);
        setRobotPos(initrobot);
        setGridArray(initgrid);
    }, [gridSize, gridSize, chanceOfTrash]);



    return (
        <>
            <Controller
                setGridSize={setGridSize}
                setChangeOfTrash={setChangeOfTrash}
                setNumberOfRuns={setNumberOfRuns}
                gridSize={gridSize}
                chanceOfTrash={chanceOfTrash}
            />
            <GridArray robotPos={robotPos} gridArray={gridArray} />
            <Robot
                robotPos={robotPos}
                gridArray={gridArray}
                setRobotPos={setRobotPos}
                setGridArray={setGridArray}
                gameOver={gameOver}
                setResults={setResults}
                setGameOver={setGameOver}
                moves={moves}
                setMoves={setMoves}
                trashColleted={trashColleted}
                setTrashCollected={setTrashCollected}
            />
        </>
    );
}
