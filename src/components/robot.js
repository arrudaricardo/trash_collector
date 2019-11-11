import React, { useState, useEffect, useRef, useContext } from "react";
import SwitchMode from "./switch_mode";
import { checkRobotState } from "./util";
import RobotStateDisplay from "./robot_state_display";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Pcontext } from "./game";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    }
}));

export default function Robot({
    gridArray,
    setGridArray,
    robotPos,
    setRobotPos,
    gameOver,
    setResults,
    setGameOver,
    moves,
    setMoves,
    setTrashCollected,
    trashColleted

}) {
    const classes = useStyles();
    const {pState} = useContext(Pcontext)
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState('dev');
    const [gridState, setGridState] = useState(checkRobotState(gridArray, robotPos));

    // restart grid
    useEffect(() => {
        setMoves(0);
        setTrashCollected(0);
    }, [gridArray]);

    //update current gridState
    useEffect( () => {
        setGridState(checkRobotState(gridArray, robotPos))
    }, [gridArray, robotPos, moves])



    function inputHandle(move) {
        // console.log('going',move)
        let nextPos;
        let [col, row] = robotPos;

        if (move === 'random') {
            // always get the trash if in current pos by default
            if (gridArray[col][row][1]){
                move = 'getTrash'
            } else  {
            // always move to a grid with trash
            // let robotState = checkRobotState(gridArray, robotPos).robotState
            // let moves = Object.keys(robotState).filter( e =>  robotState[e] === 'trash')
            
            let moves = Object.keys(gridState.robotState).filter( e =>  gridState.robotState[e] === 'trash')
            // console.log({moves, grid: gridState.robotState})

                    // if has trash in vision
                if (moves.length > 0){
                    move = moves[Math.floor(Math.random() * moves.length)]

                }else {
                    //check place with not wall
                    let moves = Object.keys(gridState.robotState).filter( e =>  gridState.robotState[e] !== 'wall' && e !== 'current' )
                    console.log(moves)
                    move = moves[Math.floor(Math.random() * moves.length)]
                    
                }
            }
        }
        console.log('moving',move)

        switch (move) {
            case "up":
                // if col is < 0, next position is 'wall'
                if (row - 1 < 0) {
                    nextPos = "wall";
                } else {
                    nextPos = gridArray[col][row - 1][0];
                }
                return updateRobotPos(nextPos, robotPos);

            case "down":
                nextPos = gridArray[col][row + 1][0] || "wall";
                return updateRobotPos(nextPos, robotPos );

            case "left":
                // if col is < 0, next position is 'wall'
                if (col - 1 < 0) {
                    nextPos = "wall";
                } else {
                    nextPos = gridArray[col - 1][row][0];
                }
                return updateRobotPos(nextPos, robotPos );

            case "right":
                if (gridArray[col + 1] === undefined) {
                    nextPos = "wall";
                } else {
                    nextPos = gridArray[col + 1][row][0];
                }
                return updateRobotPos(nextPos, robotPos );
                
            case 'getTrash':
                // current position
                let currPos = gridArray[col][row][0];
                let hasTrash = gridArray[col][row][1]
                if (hasTrash) return updateRobotPos(currPos, robotPos, true);
                break;

            default:
                throw Error("Please specify movment")
        }
    }

    const arrowKeyListener = () => {
        document.onkeydown = function(e) {
            if (mode !== 'dev') return;
            e.preventDefault();
            switch (e.keyCode) {
                case 32: 
                    inputHandle('getTrash')
                    break;
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

    function updateRobotPos(newPos, oldPos,  getTrash = false) {
        if (newPos === "wall") {
            return false;
        }

        // update grid with new states
        setGridArray(prevGridArray => {
            if (getTrash) {
                // remove trash from grid from grid
                prevGridArray[oldPos[0]][oldPos[1]][1] = false;

                setRobotPos(newPos); // update robot pos

                // add to counter
                setTrashCollected(trashColleted + 1);
            } else {
            // remove robot position of GridArray
            prevGridArray[oldPos[0]][oldPos[1]][2] = false;
            // add robot new position into array
            prevGridArray[newPos[0]][newPos[1]][2] = true;

            setRobotPos(newPos); // update robot pos
            }


            setGridArray(gridArray) // update grid
            setMoves(moves + 1);
            return prevGridArray;
        });

        return true;
    }

    // return {robotState, stateSum}

    function getNextMove() {
        // let gridState = checkRobotState(gridArray, robotPos);
        // check if state is set on posibilities state by the user
        let nextMove = pState[gridState.stateSum]

        if (nextMove) {
            return nextMove
        } else {
            return 'random'
        }

    }

    useEffect(()=> {
        let loop;
        if (running  && !gameOver){
            // inputHandle(getNextMove())
            // loop = setTimeout( () => {
            //     inputHandle(getNextMove())
            //     // toggle running state
            //     } , 200)
        }

        return () => clearTimeout(loop);
    }, [running, gameOver])



    useEffect (() =>  {
        if (checkGameOver()) {
            let score = ( ((moves / trashColleted) ) * 100 ).toFixed(1) // 100 is perfect score
            let newResult = {score, moves, trash: trashColleted, gridSize: gridArray.length}
            setResults(results => [...results, newResult])
            console.log("Game Over!", newResult)
        }
    }, [gridState])

    function checkGameOver() {
        return !gridArray.some( arr => arr.some(e => e[1] === true))
    }

    
    function handleRun(e) {
        e.preventDefault();

        // toggle running state
        setRunning((prev) => !prev)
            inputHandle(getNextMove())
        
    }


    return (
        <div style={{ display: "flex" }}>
            <div>

            <Button
                onClick={handleRun}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                {running ? "STOP": "RUN"}
            </Button>
            <SwitchMode setMode={setMode} mode={mode} />
            <div>StateId: {gridState.stateSum} </div>
            </div>
            <div className="robot-information">
                <div className="trashColleted">
                    Trash Collected: {trashColleted}
                </div>
                <div className="moves">Moves: {moves}</div>
            </div>
            <RobotStateDisplay gridState={gridState.robotState} />
        </div>
    );
}
