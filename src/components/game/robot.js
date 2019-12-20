import React, { useState, useEffect, useContext } from "react";
import SwitchMode from "./switch_mode";
import { checkRobotState, infinitLoop} from "../util";
import RobotStateDisplay from "./robot_state_display";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Pcontext } from "../game";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    textField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(1),
        width: 40
    },
    formControl: {
        margin: theme.spacing(1),
       top: '0.55em',
        minWidth: 90,
    },
}));

export default function Robot() {
    const classes = useStyles();
    const { state, dispatch } = useContext(Pcontext);
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState("normal"); //dev or normal
    const [gridState, setGridState] = useState(null)
    const [runTimes, setRunTimes] = useState(1);


    function inputHandle(move) {
        let nextPos;
        let [col, row] = state.grid.robotPos;

        if (move === "default") {
            // always get the trash if in current pos by default
            if (state.grid.gridArray[col][row][1]) {
                move = "getTrash";
            } else {
                // always move to a grid with trash
                // let robotState = checkRobotState(gridArray, robotPos).robotState
                // let moves = Object.keys(robotState).filter( e =>  robotState[e] === 'trash')

                let moves = Object.keys(gridState.robotState).filter(
                    e => gridState.robotState[e] === "trash"
                );

                // if has trash in vision
                if (moves.length > 0) {
                    move = moves[Math.floor(Math.random() * moves.length)];
                } else {
                    //check place with not wall
                    let moves = Object.keys(gridState.robotState).filter(
                        e =>
                            gridState.robotState[e] !== "wall" &&
                            e !== "current"
                    );
                    move = moves[Math.floor(Math.random() * moves.length)];
                }
            }
        } else if (move === "random") {
            // let moves = ["up", "down", "left", "right"];
            let moves = Object.keys(gridState.robotState).filter(
                e => gridState.robotState[e] !== "wall" && e !== "current"
            );
            move = moves[Math.floor(Math.random() * moves.length)];
        }

        switch (move) {
            case "up":
                // if col is < 0, next position is 'wall'
                if (row - 1 < 0) {
                    nextPos = "wall";
                } else {
                    nextPos = state.grid.gridArray[col][row - 1][0];
                }
                return updateRobotPos(nextPos, state.grid.robotPos);

            case "down":
                nextPos = state.grid.gridArray[col][row + 1][0] || "wall";
                return updateRobotPos(nextPos, state.grid.robotPos);

            case "left":
                // if col is < 0, next position is 'wall'
                if (col - 1 < 0) {
                    nextPos = "wall";
                } else {
                    nextPos = state.grid.gridArray[col - 1][row][0];
                }
                return updateRobotPos(nextPos, state.grid.robotPos);

            case "right":
                if (state.grid.gridArray[col + 1] === undefined) {
                    nextPos = "wall";
                } else {
                    nextPos = state.grid.gridArray[col + 1][row][0];
                }
                return updateRobotPos(nextPos, state.grid.robotPos);

            case "getTrash":
                // current position
                let currPos = state.grid.gridArray[col][row][0];
                let hasTrash = state.grid.gridArray[col][row][1];
                if (hasTrash)
                    return updateRobotPos(currPos, state.grid.robotPos, true);
                break;

            default:
                throw Error("Please specify movment");
        }
    }

    const arrowKeyListener = () => {
        document.onkeydown = function(e) {
            if (mode !== "dev") return;
            e.preventDefault();
            switch (e.keyCode) {
                case 32:
                    inputHandle("getTrash");
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

    function updateRobotPos(newPos, oldPos, getTrash = false) {
        if (newPos === "wall") {
            return false;
        }
        // update grid with new states
        const nextGridArray = () => {
            let prevGridArray = state.grid.gridArray;

            if (getTrash) {
                // remove trash from grid from grid
                prevGridArray[oldPos[0]][oldPos[1]][1] = false;

                dispatch({ type: "setRobotPos", payload: newPos });

                // add to counter
                dispatch({
                    type: "setTrashCollected",
                    payload: state.grid.trashColleted + 1
                });
            } else {
                // remove robot position of GridArray
                prevGridArray[oldPos[0]][oldPos[1]][2] = false;
                // add robot new position into array
                prevGridArray[newPos[0]][newPos[1]][2] = true;

                dispatch({ type: "setRobotPos", payload: newPos });
            }

            // dispatch({type:'setGridArray', payload: newPos})
            // setGridArray(gridArray) // update grid

            dispatch({ type: "setMoves", payload: state.grid.moves + 1 });
            return prevGridArray;
        };
        dispatch({ type: "setGridArray", payload: nextGridArray() });

        return true;
    }

    // return {robotState, stateSum}

    function getNextMove() {
        // let gridState = checkRobotState(gridArray, robotPos);
        // check if state is set on posibilities state by the user
        let nextMove = state.moves[state.grid.gameName][gridState.stateSum];

        if (nextMove) {
            return nextMove;
        } else {
            return "default";
        }
    }

    //update current gridState
    useEffect(() => {
        let game = setTimeout(() => {
        setGridState( checkRobotState(state.grid.gridArray, state.grid.robotPos));
        }, state.grid.speed)
        if (running === 'false') {clearTimeout(game)}
    }, [state.grid.gridArray, state.grid.moves, running]);

    useEffect(() => {
        checkGameOver();
        if (running && !state.grid.gameOver) {
            inputHandle(getNextMove());
        } else if (runTimes > 1) {
            setRunning(prev => !prev);
        } 
        }, [gridState]);

    useEffect(() => {
        if (runTimes > 1 && state.grid.gameOver) {
            dispatch({ type: "setGameOver", payload: false });
            setRunning(true);
        }
    }, [state.grid.gameOver]);

    function checkGameOver() {
        let isOver = !state.grid.gridArray.some(arr =>
            arr.some(e => e[1] === true)
        );
        if (isOver && !state.grid.gameOver) {
            let newResult = {
                gameName: state.grid.gameName,
                moves: state.grid.moves,
                trashsCollected: state.grid.trashColleted,
                gridSize: state.grid.gridSize,
                fail: false
            };

            dispatch({ type: "setGameOver", payload: true });
            setRunning(false);
            // add to results
            dispatch({ type: "addResult", result: newResult });

            setRunTimes(prev => prev === 1? prev: prev -1 )
            dispatch({ type: "resetGridArray" });
        }

        // if running to much times
        if (state.grid.moves > state.grid.gridSize ** 4) {
            let newResult = {
                gameName: state.grid.gameName,
                moves: state.grid.moves,
                trashsCollected: state.grid.trashColleted,
                gridSize: state.grid.gridSize,
                fail: true
            };
            dispatch({ type: "setGameOver", payload: true });
            setRunning(false);
            dispatch({ type: "addResult", result: newResult });
            setRunTimes(prev => prev === 1? prev: prev -1 )
            dispatch({ type: "resetGridArray" });
        }
    }

    function handleRun(e) {
        e.preventDefault();
        // toggle running state
        setRunning(prev => !prev);
    }

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
                <Tooltip enterDelay={500} title="Start Game">
                    <Button
                        disabled={runTimes === 0}
                        onClick={handleRun}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        {running ? "STOP" : "RUN"}
                    </Button>
                </Tooltip>

                <TextField
                    value={runTimes}
                    onChange={e => setRunTimes(e.target.value)}
                    min="-1"
                    step="1"
                    id="runTimes"
                    label="Times"
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                />

                <Tooltip title="Robot Speed"placement="top">
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Speed</InputLabel>
                    <Select
                    labelId="robot speed"
                    value={state.grid.speed}
                    onChange={(event) => dispatch({type:'changeSpeed', value: event.target.value})}
                    >
                    <MenuItem value={1000}>slow</MenuItem>
                    <MenuItem value={500}>medium</MenuItem>
                    <MenuItem value={100}>fast</MenuItem>
                    </Select>
                    </FormControl>
                </Tooltip>

                {/* <SwitchMode setMode={setMode} mode={mode} />
                {mode === "dev" && <div>StateId: {gridState.stateSum} </div>} */}

            <div className="robot-information">
                <div className="trashColleted">
                    Trash Collected: {state.grid.trashColleted}
                </div>
                <div className="moves">Moves: {state.grid.moves}</div>
            </div>
            {mode === "dev" && (
                <RobotStateDisplay gridState={gridState.robotState} />
            )}
        </div>
    );
}
