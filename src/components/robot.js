import React, { useState, useEffect, useRef } from "react";
import Arrows from "./arrows";
import Script from "./script";
import SwitchMode from "./switch_mode";
import { checkRobotState } from "./util";
import RobotStateDisplay from './robot_state_display'

export default function Robot({
    id,
    gridArray,
    setGridArray,
    robotPos,
    setRobotPos
}) {
    const [devMode, setDevMode] = useState(true);
    const [trashColleted, setTrashCollected] = useState(0);
    const [moves, setMoves] = useState(0);
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
            if (!devMode) return;
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

    function updateRobotPos(newPos, oldPos, hasTrash) {
        // console.log('oldbox',gridArray[oldPos[0]][oldPos[1]])
        if (newPos === "wall") {
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

            const gridState = checkRobotState(gridArray, robotPos)
    return (
        <div style={{display:'flex'}}>
            {/* <Arrows></Arrows> */}
            <SwitchMode setDevMode={setDevMode} devMode={devMode} />
            <div className="robot-information">
                <div className="trashColleted">
                    Trash Collected: {trashColleted}
                </div>
                <div className="moves">Moves: {moves}</div>
            </div>
            <RobotStateDisplay gridState={gridState} />
        </div>
    );
}
